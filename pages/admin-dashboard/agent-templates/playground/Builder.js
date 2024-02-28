import React, { useEffect, useRef, useState } from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useBuilder from "../hook/useBuilder";
import AdvancedRag from "./AdvancedRag";

const Builder = ({
  workspaceId,
  slectedProjectId,
  messageList = [],
  setMessageList = () => {},
  getConfig = () => {},
  handleSetAdvancedRag = () => {}
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const { onSend, isMessageLoading, ragData } = useBuilder({
    workspaceId,
    slectedProjectId,
    inputMessage,
    setInputMessage,
    messageList,
    setMessageList,
    getConfig,
  });


  const handleChange = (e) => {
    const value = e.target.value;
    setInputMessage(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSend();
    }
  };

  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div className="pe-2">
      <div className="border rounded-lg">
        <div className="border-b p-3 text-gray-400">Chat</div>
        <div
          className="w-full max-h-96 overflow-y-auto"
          ref={scrollContainerRef}
        >
          <div className="w-full">
            {messageList.map((message, index) => (
              <div key={index} className="flex w-full flex-col overflow-y-auto">
                <div className="w-full px-4 flex justify-end ">
                  <div className="w-fit border bg-gray-400 text-white text-sm px-3 py-1.5 rounded rounded-tr-none my-0.5">
                    {message.user}
                  </div>
                </div>
                <div className="flex justify-start px-4 w-full">
                  {message?.builder === "" ||
                  message?.builder === undefined ? null : (
                    <div className="w-fit border my-0.5  text-sm px-3 py-1.5 rounded rounded-tl-none text-white bg-primary-accent-color">
                      {message.builder}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3">
            {isMessageLoading && (
              <div className="bg-gray-100 mb-3 mx-1 rounded-tl-none rounded p-3 flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <FontAwesomeIcon
                    className="text-xxs mr-4 opacity-40 animate-ping"
                    icon={faCircle}
                  />
                  <FontAwesomeIcon
                    className="text-xxs mr-4 opacity-40 animate-ping"
                    icon={faCircle}
                  />
                  <FontAwesomeIcon
                    className="text-xxs mr-4 opacity-40 animate-ping"
                    icon={faCircle}
                  />
                </div>
              </div>
            )}
            <div className="relative">
              <input
                name="chatInput"
                type="text"
                value={inputMessage}
                onChange={handleChange}
                className="block w-full px-2 py-2 ps-4 text-sm text-gray-900 border focus:outline-none bg-gray-50 border-gray-300 rounded-lg focus:ring-primary-accent-color focus:border-primary-accent-color"
                placeholder="Chat with insituate..."
                onKeyDown={handleKeyDown}
                disabled={isMessageLoading}
              />
              <button
                disabled={inputMessage === ""}
                onClick={onSend}
                className="absolute cursor-pointer inset-y-0 rtl:inset-r-0 end-0 flex items-center pe-3"
              >
                <img src="/images/send.svg" alt="send" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 flex justify-center">
        <button
          onClick={() => setMessageList([])}
          className="border rounded text-primary-accent-color text-sm border-primary-accent-color px-4 py-1"
        >
          Clear & Reset
        </button>
      </div>
      <AdvancedRag ragData={ragData} handleSetAdvancedRag={handleSetAdvancedRag} />
    </div>
  );
};

export default Builder;
