import React from 'react';

const AddFolder = ({ parent, setAddStatus }) => {
    const cancelCreate = () => {
        setAddStatus(false);
    }
    const addFolder = () => {
        alert(`creating folder in ${parent._id}`)
        setAddStatus(false)
    }
    return (
        <div className='modal-area'>
            <div className="modal">
                <h2>Add Folder In {parent.name}</h2>
                <input type="text" placeholder='folder name' />
                <div className="btn">
                    <button onClick={cancelCreate}>Cancell</button>
                    <button onClick={addFolder}>Create</button>
                </div>
            </div>
        </div>
    );
};

export default AddFolder;