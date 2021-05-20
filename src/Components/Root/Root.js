import React, { useEffect, useState } from 'react';
import Folder from './Folder/Folder';

const Root = () => {
    const [child, setChild] = useState([])
    useEffect(() => {
        setChild([{ id: 'Folder 1', children: [{ id: 'Grand child', children: [{ id: 'Great Grandchild', children: [] }] }] }])
    }, [])
    return (
        <div>
            <h1>Root:</h1>
            <Folder name='My Folder' child={child}></Folder>
        </div>
    );
};

export default Root;