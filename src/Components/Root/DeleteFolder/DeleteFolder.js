import React from 'react';

const DeleteFolder = ({ setDeleteStatus, folderData }) => {
    console.log(folderData)
    const cancelDelete = () => {
        setDeleteStatus(false)
    }
    const handleDelete = () => {
        deleteOne(folderData._id)
        setDeleteStatus(false)
    }
    const deleteOne = (id) => {
        const uri = `http://localhost:1606/delete/${id}`;
        fetch(uri, { method: "DELETE" })
            .then(res => res.json())
            .then(result => console.log(result))
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