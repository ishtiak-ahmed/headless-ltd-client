import React, { useEffect, useState } from 'react';
import AddFolder from '../AddFolder/AddFolder';
import DeleteFolder from '../DeleteFolder/DeleteFolder';

const Folder = ({ id }) => {
    const [addStatus, setAddStaus] = useState(false)
    const [deleteStatus, setDeleteStatus] = useState(false)
    const [showChild, setShowChild] = useState(false)
    const toggleFolder = () => {
        setShowChild(!showChild)
    }
    // const [children, setChildren] = useState([])
    const [folderData, setFolderData] = useState({})
    useEffect(() => {
        fetch(`http://localhost:1606/folder/${id}`)
            .then(res => res.json())
            .then(data => setFolderData(data))
    }, [id])

    // Handler Function
    const addFolder = () => {
        setAddStaus(true)
    };
    const deleteFolder = () => {
        setDeleteStatus(true)
    }
    return (
        <div className='folder-area'>
            <div className="folder">
                <span>{showChild ? <span className='arrow-down'></span> : <span className='arrow-left'></span>}</span>
                <span onClick={toggleFolder}>{folderData.name} {folderData.length}</span>
                {
                    folderData.name !== 'Root' ?
                        <button onClick={deleteFolder}>X</button>
                        : <></>
                }
                <button onClick={addFolder}>+ Add</button>
                {
                    showChild ?
                        <div className="folder">
                            {
                                folderData.children.length
                                    ?
                                    folderData.children.map(child => <Folder key={child} name={child} id={child}></Folder>)
                                    : <div className="no-folder"><span>-No Folder</span></div>
                            }
                        </div>
                        : <></>
                }
            </div>
            {
                addStatus ?
                    <AddFolder setAddStatus={setAddStaus} parent={folderData}></AddFolder>
                    : <></>
            }
            {
                deleteStatus ?
                    <DeleteFolder folderData={folderData} setDeleteStatus={setDeleteStatus}></DeleteFolder>
                    : <></>
            }

        </div>
    );
};

export default Folder;