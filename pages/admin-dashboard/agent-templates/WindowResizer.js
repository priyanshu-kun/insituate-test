import React, { useState, useEffect } from "react";
import Loader from "../../common-component/loader/loader";
const MIN_CENTER_WIDTH = 380;
const MIN_LAST_WIDTH = 400;

function WindowResizer({
  centerRef,
  lastRef,
  isInputToggleOn,
  setIsInputToggle,
  InputJsonModeOn,
  InputJsonModeOff,
  onSendQuery,
  isInferenceLoading,
  isResponseToggleOn,
  setIsResponseToggleOn,
  ResponseJsonModeOn,
  ResponseJsonModeOff,
  queryData,
  Metadata,
  projectConfig,
  handleTempCache = () => {},
}) {
  const [lastContainerWidth, setLastContainerWidth] = useState(600);
  const [cached, setCached] = useState(false);
  const [widths, seWidths] = useState({
    initialCenterWidth: undefined,
    initialLastWidth: undefined,
  });

  useEffect(() => {
    seWidths({
      initialCenterWidth: centerRef.current.getBoundingClientRect().width,
      initialLastWidth: lastRef.current.getBoundingClientRect().width,
    });

    const handleScreenResize = () => {
      setLastContainerWidth(600);
      seWidths({
        initialCenterWidth: centerRef.current.getBoundingClientRect().width,
        initialLastWidth: lastRef.current.getBoundingClientRect().width,
      });
    };

    window.addEventListener("resize", handleScreenResize);

    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  useEffect(() => {
    handleTempCache(cached);
  }, [cached]);

  const startResizing = (mouseDownEvent) => {
    const startX = mouseDownEvent.clientX;
    const startWidth = lastContainerWidth;
    document.body.classList.add("select-none");

    const handleMouseMove = (mouseMoveEvent) => {
      const currentX = mouseMoveEvent.clientX;
      const deltaX = startX - currentX;
      let newLastWidth = Math.max(startWidth + deltaX, MIN_LAST_WIDTH);

      const totalWidth = widths.initialCenterWidth + widths.initialLastWidth;

      let newCenterWidth = totalWidth - newLastWidth;

      if (newCenterWidth < MIN_CENTER_WIDTH) {
        newCenterWidth = MIN_CENTER_WIDTH;
        newLastWidth = totalWidth - MIN_CENTER_WIDTH;
      }

      setLastContainerWidth(newLastWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.classList.remove("select-none");
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <div
        onMouseDown={startResizing}
        className="cursor-ew-resize w-1 bg-gray-200 hover:bg-primary-accent-color"
      />
      <div
        ref={lastRef}
        style={{
          width: `${lastContainerWidth}px`,
        }}
        className="custom-height overflow-y-auto py-4 mt-12 box-border"
      >
        <div className="ml-4 flex items-center justify-between pr-6 mb-2">
          <h1 className="text-gray-500 m-1">Query</h1>
          <div className="flex items-center">
            <span className="me-2 text-gray-500">JSON Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                name="json"
                type="checkbox"
                checked={isInputToggleOn}
                value={isInputToggleOn}
                className="sr-only peer"
                onChange={() => setIsInputToggle((prev) => !prev)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-accent-color"></div>
            </label>
          </div>
        </div>
        {isInputToggleOn ? <InputJsonModeOn /> : <InputJsonModeOff />}
        <div className="flex  mt-4 mb-12 w-full items-center justify-between px-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              value={cached}
              onChange={(e) => setCached((prev) => !prev)}
            />
            <span className="text-primary-accent-color text-xs ml-2">
              Use Cached
            </span>
          </label>
          <button
            onClick={onSendQuery}
            disabled={isInferenceLoading}
            className="border rounded hover:text-black text-gray-500 text-sm p-1 w-28 h-8 flex justify-center items-center mr-14"
          >
            {isInferenceLoading ? <Loader /> : "RUN"}
          </button>
          <h1></h1>
        </div>
        <div className="ml-4 flex items-center justify-between pr-6 mb-4">
          <h1 className="text-gray-500">Response</h1>
          <div className='flex items-center'>
            <span className="me-2 text-gray-500">JSON Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                name="json"
                type="checkbox"
                checked={isResponseToggleOn}
                value={isResponseToggleOn}
                className="sr-only peer"
                onChange={() => setIsResponseToggleOn((prev) => !prev)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-accent-color"></div>
            </label>
          </div>
        </div>
        {isResponseToggleOn ? (
          <ResponseJsonModeOn />
        ) : (
          <ResponseJsonModeOff queryData={queryData} />
        )}
        <hr className="my-2"></hr>
        <Metadata projectConfig={projectConfig} />
      </div>
    </>
  );
}

export default WindowResizer;
