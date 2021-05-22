import React from 'react';

const DeleteFolder = ({ deleteOne, setDeleteStatus, folderData, parent }) => {
    console.log(folderData)
    const cancelDelete = () => {
        setDeleteStatus(false)
    }
    const handleDelete = () => {
        // alert(`deleting folder from ${parent}`)
        // console.log(parent, folderData._id)
        deleteOne(parent, folderData._id)
        setDeleteStatus(false)
    }

    return (
        <div className='modal-area'>
            <div className="modal">
                <h2>Confirm Delete Folder </h2>
                <div className="btn">
                    <button onClick={cancelDelete}>Cancel</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteFolder;