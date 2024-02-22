"use client"
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

enum Options {
    three = "近三年",
    five = "近五年",
    eight = "近八年"
}
export const SimpleListMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedOption, setSelectedOption] = React.useState<Options>(Options.three);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };



    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <div onClick={handleClickListItem} className=" bg-blue-500 p-1">{selectedOption}</div>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {
                    Object.values(Options).map(k => {
                        return <MenuItem key={k} onClick={() => {
                            setSelectedOption(k)
                        }}>
                            {k}
                        </MenuItem>
                    })
                }

            </Menu>
        </div>
    );
}