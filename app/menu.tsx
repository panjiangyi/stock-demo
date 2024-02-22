"use client"
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Direction = {
    name: string;
    path: string;
}

const menus: Direction[] = [
    { name: "财务报表", path: '/statements' },
    { name: "最新动态", path: '/updates' },
    { name: "获利能力", path: '/profitability' },
    { name: "安全性分析", path: '/security' },
]

export const mainPage = menus[0]

export const useCurrentDirection = () => {
    const pathname = usePathname()
    return menus.find(menu => pathname.includes(menu.path));

}
export const Menu: React.FC<{
    className?: string
}> = ({
    className,
}) => {
        const currentDirection = useCurrentDirection()

        return <List className={className}>
            {menus.map((menu) => {
                const isActive = currentDirection == menu;
                return <Link href={menu.path} scroll={false} key={menu.path}>
                    <ListItem className={classNames({
                        "border-r-2  border-blue-500": isActive
                    })} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={menu.name} />
                        </ListItemButton>
                    </ListItem>
                </Link>
            })}
        </List >
    }
