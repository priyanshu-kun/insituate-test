import React from "react";
import Modal from "../../common-component/Modal";
import useEditProfile from "./hooks/useEditProfile";

const EditNameModal = ({
  editName,
  setEditName,
  editProfile,
  setEditProfile,
  getEmployees,
}) => {
  const { onEditProfile, isLoading } = useEditProfile({
    editProfile,
    getEmployees,
    setEditName,
  });

  const onClose = () => {
    setEditName(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEditProfile((prev) => ({ ...prev, name: value }));
  };

  return (
    <Modal closeModal={onClose} showModal={editName} modalWidth="w-1/4">
      <div>
        <h1 className="flex justify-center text-gray-500">Edit Profile</h1>
        <div className="flex my-4 justify-center items-center">
          <input
            type="text"
            defaultValue={editProfile?.name}
            // value={searchInput}
            onChange={handleInputChange}
            required
            className="w-4/5 shadow p-1 border rounded-lg focus:outline-none focus:border-primary-accent-color"
          />
        </div>
        <div className="flex justify-center">
          <button
            disabled={isLoading}
            onClick={onEditProfile}
            className="bg-primary-accent-color disabled:bg-gray-500 hover:bg-button-hover-color text-white rounded-2xl px-8 py-1 mb-4"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditNameModal;
