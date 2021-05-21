import React, { useEffect, useState } from 'react';
import Folder from './Folder/Folder';

const Root = () => {
    const [folder, serFolder] = useState({})

    useEffect(() => {
        fetch('http://localhost:1606/folder/root')
            .then(res => res.json())
            .then(data => serFolder(data))

    }, [])
    return (
        <div>
            <Folder id={folder._id}></Folder>
        </div>
    );
};

export default Root;