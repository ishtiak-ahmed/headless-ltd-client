import React from 'react';

const DeleteFolder = ({ setDeleteStatus }) => {
    const cancelDelete = () => {
        setDeleteStatus(false)
    }
    const handleDelete = () => {
        setDeleteStatus(false)
    }
    return (
        <div className='modal-area'>
            <div className="modal">
                <h2>Confirm Delete Folder </h2>
                <div className="btn">
                    <button onClick={cancelDelete}>Cancell</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteFolder;