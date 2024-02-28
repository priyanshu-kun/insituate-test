import React, { useEffect, useState } from "react";
import Modal from "../../../common-component/Modal";
import copyTextToClipboard from "../../../utils/utillityFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faExternalLink } from "@fortawesome/free-solid-svg-icons";
import hljs from "highlight.js";
import python from "highlight.js/lib/languages/python";
import 'highlight.js/styles/monokai.css'; // Monokai theme

const ExportAPI = ({ exportAPImodal, setExportAPImodal, exportAPIdata }) => {
  const { code, url, api_id } = exportAPIdata || {};
  const [isCopied, setIsCopied] = useState(false);
  const formattedCode = { __html: code };
  hljs.registerLanguage("python", python);

  useEffect(() => {
    hljs.highlightAll();
  }, [formattedCode]); 

  return (
    <Modal
      showModal={exportAPImodal}
      closeModal={() => setExportAPImodal(false)}
    >
      <div className="text-gray-500 -mt-5 mx-8 mb-6">
        <div className="flex justify-center text-2xl">
          API exported successfully{" "}
        </div>
        <div className="flex justify-center items-center">
          You can test your API via a post request.
          <span
            className="text-blue-700 ms-1 cursor-pointer"
            onClick={() => window.open(url, "_blank")}
          >
            Visit here
            <FontAwesomeIcon
              icon={faExternalLink}
              className="ms-2 cursor-pointer text-blue-600"
            />
          </span>
        </div>
        <div className="flex justify-center my-2">Or</div>
        <div className="flex justify-center text-xl mb-4">
          Here is a sample python code, on how to use your API.
        </div>
        <div className="border rounded-xl my-2 overflow-y-auto">
          <div className="flex justify-end py-2 bg-gray-600">
            <button
              onClick={() => copyTextToClipboard(code, setIsCopied, api_id)}
              className="mx-2 text-white cursor-pointer"
            >
              {isCopied === api_id ? (
                "Copied"
              ) : (
                <FontAwesomeIcon icon={faCopy} className="mr-1" />
              )}
            </button>
          </div>
          <div className="whitespace-pre-wrap bg-black">
            <div className="text-white  h-80 overflow-y-scroll text-xs">
              <pre>
                <code className="python" dangerouslySetInnerHTML={formattedCode}></code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ExportAPI;
