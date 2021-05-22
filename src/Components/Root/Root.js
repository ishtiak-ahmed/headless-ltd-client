import React, { useEffect, useState } from 'react';
import Folder from './Folder/Folder';

const Root = () => {
    const [folder, serFolder] = useState({})

    useEffect(() => {
        fetch('https://tree-folder-structure.herokuapp.com/folder/root')
            .then(res => res.json())
            .then(data => serFolder(data))

    }, [])
    return (
        <>
            <Folder id={folder._id}></Folder>
        </>
    );
};

export default Root;