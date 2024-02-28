import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashAlt,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import EditNameModal from "./EditNameModal";
import DeleteIdModal from "./DeleteIdModal";
import GenerateIdModal from "./GenerateIdModal";
import useGetEmployees from "./hooks/useGetEmployees";

import copyTextToClipboard, {
  formatDateTime,
  truncateString,
} from "../../utils/utillityFunction";
import PrimaryHeading from '../../common-component/primary-heading/PrimaryHeading';
import SecondaryHeading from '../../common-component/secondary-heading/SecondaryHeading';

const EmployIdGenerator = () => {
  const [editName, setEditName] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [generateId, setGenerateId] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [editProfile, setEditProfile] = useState({});
  const { employees, isLoading, getEmployees } = useGetEmployees();

  return (
    <div className="w-full">
      <div>
        <PrimaryHeading headingContent={"Employee ID Generator"} />
        {/* <SecondaryHeading headingContent={""} /> */}
        <div className="text-sm text-gray-500 flex ml-2">Manage Employees</div>
      </div>
      <div className="border pb-2  mb-6 mt-1 mr-12 rounded">
        <div className="flex px-4 py-2">
          <div className="w-1/3">Name</div>
          <div className="w-1/3">ID</div>
          <div className="w-1/4">Created</div>
        </div>
        <hr></hr>
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            {employees?.length > 0 ? (
              <>
                {employees.map((item, index) => {
                  const { id, name, created_on } = item || {};
                  return (
                    <div key={id}>
                      <div className="flex px-4 py-2 text-gray-500">
                        <div className="w-1/3">
                          {index + 1}. {name}
                        </div>
                        <div className="w-1/3 flex items-center">
                          <span className='block min-w-32 max-w-48'>{truncateString(id, 5, 5, 10)}</span> 
                          <button
                            onClick={() =>
                              copyTextToClipboard(id, setIsCopied, id)
                            }
                            className="ml-2 flex items-center hover:text-primary-accent-color"
                          >
                            {isCopied === id ? (
                              "Copied"
                            ) : (
                              <FontAwesomeIcon icon={faCopy} />
                            )}
                          </button>
                        </div>
                        <div className="w-1/4">
                          {formatDateTime(created_on)}
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              setEditName(true);
                              setEditProfile({ id: id, name: name });
                            }}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteId(true);
                              setEditProfile({ id: id, name: name });
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              className="ml-3"
                            />
                          </button>
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                  );
                })}
              </>
            ) : (
              "No Results Found"
            )}
          </>
        )}
      </div>
      <div className="flex justify-center pb-6">
        <button
          onClick={() => setGenerateId(true)}
          className="bg-primary-accent-color text-white rounded-xl border py-1.5 px-14"
        >
          Generate ID
        </button>
      </div>
      {editName && (
        <EditNameModal
          editName={editName}
          getEmployees={getEmployees}
          editProfile={editProfile}
          setEditProfile={setEditProfile}
          setEditName={setEditName}
        />
      )}
      {deleteId && (
        <DeleteIdModal
          deleteId={deleteId}
          setDeleteId={setDeleteId}
          editProfile={editProfile}
          getEmployees={getEmployees}
        />
      )}
      {generateId && (
        <GenerateIdModal
          generateId={generateId}
          setGenerateId={setGenerateId}
          getEmployees={getEmployees}
        />
      )}
    </div>
  );
};

export default EmployIdGenerator;
