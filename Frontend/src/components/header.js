import { capitalize } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import React from "react";
import { Navigate } from 'react-router-dom';

function Header(props) {
    const { name } = props;
    function stringToColor(string) {
        let hash = 0;
        let i;
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color+1;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
    function handlelogout(){
        window.location.reload();
    }
    return (
        < div className="head_container" >
            <div className='left' onClick={handlelogout} >Logout</div>
            <div className='right'>
            <Avatar {...stringAvatar(name)} />
                {name}
            </div>
        </div >
    )
}

export default Header;