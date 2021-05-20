import React, { useState } from 'react';

const Folder = ({ name, child }) => {
    const [showChild, setShowChild] = useState(false)
    const toggleFolder = () => {
        setShowChild(!showChild)
    }
    return (
        <div className='folder-area'>
            <div className="folder">
                <span>{showChild ? "^" : ">"}</span>
                <span onClick={toggleFolder}>{name}</span>
                <button>X</button>
                <button>Add</button>
                {
                    showChild ?
                        <div className="folder">
                            {
                                child.length
                                    ? <Folder name={child[0].id} child={child[0].children}></Folder>
                                    : <p>No Folder</p>
                            }
                        </div>
                        : <></>
                }
            </div>

        </div>
    );
};

export default Folder;