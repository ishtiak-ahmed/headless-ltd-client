import React, { useState } from 'react';

const AddFolder = ({ parent, setAddStatus, handleAddFolder }) => {
    const cancelCreate = () => {
        setAddStatus(false);
    }
    const [folderName, setFolderName] = useState('')
    const handleInput = (e) => {
        setFolderName(e.target.value)
    }
    const handleAdd = () => {
        handleAddFolder(parent, folderName)
    }

    return (
        <div className='modal-area'>
            <div className="modal">
                <h2>Add Folder In {parent.name}</h2>
                <input type="text" onChange={handleInput} placeholder='folder name' />
                <div className="btn">
                    <button onClick={cancelCreate}>Cancel</button>
                    <button onClick={handleAdd}>Create</button>
                </div>
            </div>
        </div>
    );
};

export default AddFolder;