import React from 'react';

const DeleteFolder = ({ setDeleteStatus, folderData, parent }) => {
    const cancelDelete = () => {
        setDeleteStatus(false)
    }
    const handleDelete = () => {
        deleteOne(parent, folderData._id)
    }

    // Parent Update Method
    const updateParent = (parent, id) => {
        fetch(`https://tree-folder-structure.herokuapp.com/folder/${parent}`)
            .then(res => res.json())
            .then(data => {
                const childs = data.children;
                const newChilds = childs.filter(child => child !== id)
                fetch(`https://tree-folder-structure.herokuapp.com/updateparent/${parent}`, {
                    method: 'PATCH',
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ childs: newChilds })
                })
                    .then(response => response.json())
                    .then(res => {
                        if (res) {
                            window.location.reload()
                        } else {
                            alert('something went wrong')
                        }
                    })
            })
    }
    // Delete Folder
    const deleteOne = (parent, id) => {
        const uri = `https://tree-folder-structure.herokuapp.com/delete/${id}`;
        fetch(uri, { method: "DELETE" })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    updateParent(parent, id)
                }
                else (
                    alert('Delete failed')
                )
            })
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