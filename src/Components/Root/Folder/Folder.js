import React, { useEffect, useState } from 'react';
import AddFolder from '../AddFolder/AddFolder';
import DeleteFolder from '../DeleteFolder/DeleteFolder';

const Folder = ({ id, parentId }) => {
    const [addStatus, setAddStaus] = useState(false)
    const [deleteStatus, setDeleteStatus] = useState(false)
    const [showChild, setShowChild] = useState(false)
    const toggleFolder = () => {
        setShowChild(!showChild)
    }
    const [folderData, setFolderData] = useState({})
    // Load Folder Data from Server
    useEffect(() => {
        fetch(`https://tree-folder-structure.herokuapp.com/folder/${id}`)
            .then(res => res.json())
            .then(data => setFolderData(data))
    }, [id])

    // Handler Function
    const showAdd = () => {
        setAddStaus(true)
    };
    const showDelete = () => {
        setDeleteStatus(true)
    }

    // Parent Update Method
    const updateParent = (parent) => {
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
                    updateParent(parent)
                }
                else (
                    alert('Delete failed')
                )
            })
    }

    // Add Parent REFERENCE
    const addParentReference = (parent, child) => {
        fetch(`https://tree-folder-structure.herokuapp.com/folder/${parent}`)
            .then(res => res.json())
            .then(data => {
                const childs = data.children;
                const newChilds = [...childs, child]
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
    // Add folder
    const addFolder = (parent, folderName) => {
        fetch(`https://tree-folder-structure.herokuapp.com/addfolder/${parent._id}`, {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ name: folderName })
        })
            .then(result => result.json())
            .then(res => {
                if (res) {
                    const child = `${parent._id}-${folderName}`
                    addParentReference(parent._id, child)
                }
            })
    }
    return (
        <div className='folder-area'>
            <div className="folder">
                <span>{showChild ? <span className='arrow-down'></span> : <span className='arrow-left'></span>}</span>
                <span onClick={toggleFolder}>{folderData.name}</span>
                {
                    folderData.id !== 'root' ?
                        <button onClick={showDelete}>X</button>
                        : <></>
                }
                <button onClick={showAdd}>+ Add</button>
                {
                    showChild ?
                        <div className="folder">
                            {
                                folderData.children.length
                                    ?
                                    folderData.children.map(child => <Folder key={child} parentId={folderData._id} id={child}></Folder>)
                                    : <div className="no-folder"><span>-No Folder</span></div>
                            }
                        </div>
                        : <></>
                }
            </div>
            {
                addStatus ?
                    <AddFolder setAddStatus={setAddStaus} parent={folderData} handleAddFolder={addFolder}></AddFolder>
                    : <></>
            }
            {
                deleteStatus ?
                    <DeleteFolder deleteOne={deleteOne} folderData={folderData} parent={parentId} setDeleteStatus={setDeleteStatus}></DeleteFolder>
                    : <></>
            }

        </div>
    );
};

export default Folder;
