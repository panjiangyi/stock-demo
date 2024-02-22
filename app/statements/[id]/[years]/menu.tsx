"use client"
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { usePathname, useRouter } from 'next/navigation';

enum Options {
    three = "3",
    five = "5",
    eight = "8"
}
export const SimpleListMenu: React.FC<{
    id: string
    years: string
}> = ({ years, id }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedOption, setSelectedOption] = React.useState<Options>(years as Options);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };



    const handleClose = () => {
        setAnchorEl(null);
    };

    const router = useRouter()

    return (
        <div>
            <div onClick={handleClickListItem} className=" bg-blue-500 p-1">近{selectedOption}年</div>
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
                            router.push(`/statements/${id}/${k}`)
                        }}>
                            近{k}年
                        </MenuItem>
                    })
                }

            </Menu>
        </div>
    );
}