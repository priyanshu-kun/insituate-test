import {
  faAngleDown,
  faMagnifyingGlass,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import useGetDomainKnowledge from "./hook/useGetDomainKnowledge";
import useUploadFile from "./hook/useUploadFile";
import useDeleteFile from "./hook/useDeleteFile";
import Modal from "../../../common-component/Modal";
import useConnectGDrive from './hook/useConnectGDrive';

const Knowledge = ({ slectedProjectId, workspaceId }) => {
  const [modal, setModal] = useState(false);
  const { isUploading, connectWithGDrive } = useConnectGDrive();
  const [uploadCred, setUploadCred] = useState({
    credentials_path: "",
    token_path: "",
    pydrive_creds_path: "",
    folder_id: "",
    project_id: ""
  });

  const handleModal = () => {
    setModal(true);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setUploadCred({...uploadCred, project_id: slectedProjectId.project_id});
    connectWithGDrive(uploadCred);
  };

  const handleUploadChange = (e) => {
    setUploadCred({ ...uploadCred, [e.target.name]: e.target.value });
  };

  const { fileList, isFileListLoading, getFileList } = useGetDomainKnowledge({
    workspaceId,
    slectedProjectId,
  });
  const { handleFileUpload, isUplaodLoading } = useUploadFile({
    slectedProjectId,
    workspaceId,
    getFileList,
  });
  const { isDeleteLoaoing, onDelete } = useDeleteFile({
    slectedProjectId,
    workspaceId,
    getFileList,
  });
  return (
    <div className="text-gray-500 mx-3">
      <div>
        <h1 className="text-xl">Embed Domain Knowledge in Secure Engine</h1>
      </div>
      <div className="border rounded my-4 py-4">
        <div className="flex w-full">
          <div className="w-3/5 border-r">
            <div className="ps-2 flex border-b">
              <h1 className="p-1 w-11/12 border-r">Files</h1>
              <span className="w-1/12 flex items-center justify-center">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
            </div>
            {fileList.map((item) => {
              const { filename, size } = item || {};
              return (
                <div className="ps-2 text-primary-accent-color flex border-b">
                  <div className="p-1 flex items-center w-11/12 border-r">
                    <div className="flex w-5/12">
                      <img src="/images/document.svg" alt="document" />
                      <div className="ml-2">
                        <h1 className="">{filename}</h1>
                        <h1 className="text-xs">{size.toFixed(2)} kb</h1>
                      </div>
                    </div>
                    <button>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </button>
                  </div>

                  <button
                    disabled={isDeleteLoaoing}
                    onClick={() => onDelete(filename)}
                    className="w-1/12 flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faTrashCan} color="gray" />
                  </button>
                </div>
              );
            })}
          </div>
          <div
            className="w-2/5 flex flex-col items-center justify-center cursor-pointer"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <div className="border border-dashed my-4 py-4 px-8 flex items-center flex-col rounded">
              <img src="/images/fileUploadLarge.svg" alt="fileUpload" />
              <h1 className="text-xs py-2">Drag your files here</h1>
            </div>
            <div className="my-4">
              {isUplaodLoading ? (
                "Uploading..."
              ) : (
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  id="fileInput"
                  className="hidden"
                />
              )}
              <button className="bg-gray-100 rounded px-4 text-primary-accent-color py-1">
                Browse
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl mt-6">Data connectors</h1>
        <ul className=" border w-1/2 rounded-xl mt-2">
          <li className="px-8 py-3 w-full border-b flex items-center justify-between">
            <span>Connect with Google Drive</span>
            <button onClick={handleModal}>Connect</button>
          </li>
          <li className="px-8 py-3 w-full border-b flex items-center justify-between">
            <span>Connect with One Drive</span>
            <button>Connect</button>
          </li>
          <li className="px-8 py-3 w-full border-b flex items-center justify-between">
            <span>Connect with S3 Bucket</span>
            <button>Connect</button>
          </li>
        </ul>
      </div>
      <Modal
        showModal={modal}
        closeModal={() => {
          setModal(false);
          setUploadCred({
            credentials_path: "",
            token_path: "",
            pydrive_creds_path: "",
            folder_id: "",
            project_id: ""
          });
        }}
      >
        <h2 className="text-2xl  text-gray-500 text-center mb-6">
          Upload Your Credentials
        </h2>
        <form
          onSubmit={handleUploadSubmit}
          className="flex flex-col  w-4/5 mx-auto"
        >
          <label className="mb-2">
            <p className="text-xs text-gray-400 ml-3">Enter Credentials Path</p>
            <input
              name="credentials_path"
              onChange={handleUploadChange}
              className="w-full p-1 border rounded-xl focus:outline-none focus:border-primary-accent-colo0 px-4 py-2 mb-2 text-gray-500"
              value={uploadCred?.credentials_path}
              placeholder='Credentials Path'
            />
          </label>
          <label className="mb-2">
            <p className="text-xs text-gray-400 ml-3">Enter Token Path</p>
            <input
              name="token_path"
              onChange={handleUploadChange}
              className="w-full p-1 border rounded-xl focus:outline-none focus:border-primary-accent-colo-indigo-500 px-4 py-2 mb-2 text-gray-500"
              value={uploadCred?.token_path}
              placeholder="Token Path"
            />
          </label>
          <label className="mb-2">
            <p className="text-xs text-gray-400 ml-3">PYDrive Creds Path</p>
            <input
              name="pydrive_creds_path"
              onChange={handleUploadChange}
              className="w-full p-1 border rounded-xl focus:outline-none focus:border-primary-accent-colo0 px-4 py-2 mb-2 text-gray-500"
              value={uploadCred?.pydrive_creds_path}
              placeholder="PYDrive Creds Path"
            />
          </label>
          <label className="mb-2">
            <p className="text-xs text-gray-400 ml-3">Folder Id</p>
            <input
              name="folder_id"
              onChange={handleUploadChange}
              className="w-full p-1 border rounded-xl focus:outline-none focus:border-primary-accent-colo0 px-4 py-2 mb-2 text-gray-500"
              value={uploadCred?.folder_id}
              placeholder="Folder Id"
            />
          </label>
          <button
            type="submit"
            className="disabled:bg-gray-500  bg-primary-accent-color hover:bg-button-hover-color text-white rounded-xl px-4 py-1 mb-4 mx-auto block"
          >
            Upload
          </button>
        </form>
      </Modal>
    </div>
  );
};

/**
 * One Drive: {
 *  client_id: <id>
 *  tenant_id: <id>
 *  client_secret: <secret>
 *  folder_path:
 *  userprincipalname:
 * }
 *
 * Google Drive: {
 *  credentials_path: <path>
 *  token_path: <path>
 *  creds_path: <path>
 *  folder_id:
 * }
 *
 * s3 bucket: {
 *  bucket:
 *  key:
 *  prefix:
 *  aws_access_id:
 *  aws_access_secret:
 *  aws_session_token:
 *  s3_endpoint_url:
 * }
 */

export default Knowledge;
