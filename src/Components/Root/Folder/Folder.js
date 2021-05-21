import React, { useEffect, useState } from 'react';

const Folder = ({ id }) => {
    const [showChild, setShowChild] = useState(false)
    const toggleFolder = () => {
        setShowChild(!showChild)
    }
    // const [children, setChildren] = useState([])
    const [folder, setFolder] = useState({})
    useEffect(() => {
        fetch(`http://localhost:1606/folder/${id}`)
            .then(res => res.json())
            .then(data => setFolder(data))
    }, [id])

    // Handler Function
    const addFolder = () => {
        alert('Adding new Folder');
    };
    const deleteFolder = () => {
        alert('delete folder');
    }
    return (
        <div className='folder-area'>
            <div className="folder">
                <span>{showChild ? <span className='arrow-down'></span> : <span className='arrow-left'></span>}</span>
                <span onClick={toggleFolder}>{folder.name} {folder.length}</span>
                {
                    folder.name !== 'Root' ?
                        <button onClick={deleteFolder}>X</button>
                        : <></>
                }
                <button onClick={addFolder}>+ Add</button>
                {
                    showChild ?
                        <div className="folder">
                            {
                                folder.children.length
                                    ?
                                    folder.children.map(child => <Folder name={child} id={child}></Folder>)
                                    : <div className="no-folder"><span>-No Folder</span></div>
                            }
                        </div>
                        : <></>
                }
            </div>

        </div>
    );
};

export default Folder;