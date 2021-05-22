import React, { useState } from 'react';

const AddFolder = ({ parent, setAddStatus }) => {
    const cancelCreate = () => {
        setAddStatus(false);
    }
    const [folderName, setFolderName] = useState('')
    const handleInput = (e) => {
        setFolderName(e.target.value)
    }
    const addFolder = () => {
        alert(`creating folder in ${parent._id}`)
        fetch(`http://localhost:1606/addfolder/${parent._id}`, {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ name: folderName })
        })
            .then(result => result.json())
            .then(res => {
                if (res) {
                    window.location.reload()
                }
            })
    }
    return (
        <div className='modal-area'>
            <div className="modal">
                <h2>Add Folder In {parent.name}</h2>
                <input type="text" onChange={handleInput} placeholder='folder name' />
                <div className="btn">
                    <button onClick={cancelCreate}>Cancel</button>
                    <button onClick={addFolder}>Create</button>
                </div>
            </div>
        </div>
    );
};

export default AddFolder;