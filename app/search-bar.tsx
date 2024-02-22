"use client"
import { TextField } from '@mui/material';
import { useRouter } from 'next/navigation'
import { useKeyPress } from 'ahooks';
import { useRef, useState } from 'react';
import { useCurrentDirection } from './menu';
import { fetchWithQueryParams } from '@/utils/fetch';
import { StockInfo } from './layout';



const Header: React.FC<{
    stocks: StockInfo[]
}> = ({ stocks }) => {
    console.log(stocks)
    const [id, setId] = useState<string>('')
    const inputRef = useRef<HTMLDivElement>(null);
    const router = useRouter()
    const currentDirection = useCurrentDirection()
    useKeyPress(
        'enter',
        () => {
            if (currentDirection == null) {
                throw new Error('404');
            }
            router.push(`${currentDirection.path}/${id}`);
        },
        {
            events: ['keyup'],
            target: inputRef,
        },
    );
    return <header className=" h-16 bg-white flex items-center justify-center">
        <TextField
            value={id}
            onChange={(e) => {
                setId(e.target.value)
            }}
            ref={inputRef}
            variant="outlined"
            size="small"
            placeholder="输入台/美股票代码，查看公司价值"
        />
    </header>
}
export default Header;