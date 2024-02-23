"use client"
import { TextField } from '@mui/material';
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react';
import { useCurrentDirection } from './menu';
import Fuse from 'fuse.js'
import { StockInfo } from '@/api';

const DropDownMenu: React.FC<{
    visible: boolean;
    onClose?: () => void;
    stocks: StockInfo[]
}> = ({ stocks, visible, onClose, }) => {
    const router = useRouter()
    const currentDirection = useCurrentDirection()


    if (!visible) return null;
    return (
        <div
            className=' z-10 border-2 border-gray-150 cursor-pointer absolute left-0 right-0 top-16 bg-white max-h-96 overflow-auto '
        >
            {
                stocks.map(stock => {
                    return <div onClick={() => {
                        if (currentDirection == null) {
                            onClose?.()
                            return
                        }
                        router.push(`${currentDirection.path}/${stock.stock_id}`);
                        onClose?.()
                    }}
                        className='hover:bg-gray-200'
                        key={stock.stock_id}>
                        {stock.stock_name}
                    </div>
                })
            }
        </div>
    )
}

const fuseOptions = {
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 1,
    threshold: 0.99,
    keys: ['stock_id', 'stock_name'],
};


const Header: React.FC<{
    stocks: StockInfo[]
}> = ({ stocks }) => {
    const [keyword, setKeyword] = useState<string>('')
    const [dropdownMenuVisible, setDropdownMenuVisible] = useState(false)
    const inputRef = useRef<HTMLDivElement>(null);

    const filteredStocks = keyword == "" ? stocks : (new Fuse(stocks, fuseOptions)).search(keyword).map((k) => k.item);

    return <header className=" h-16 bg-white flex items-center justify-center">
        <div className='relative'>
            <TextField
                value={keyword}
                onChange={(e) => {
                    setKeyword(e.target.value)
                }}
                onFocus={() => {
                    setDropdownMenuVisible(true)
                }}
                ref={inputRef}
                variant="outlined"
                size="small"
                placeholder="输入台/美股票代码，查看公司价值"
            />
            <DropDownMenu onClose={() => {
                setDropdownMenuVisible(false)
            }}
                stocks={filteredStocks}
                visible={dropdownMenuVisible}
            />

        </div>
    </header>
}
export default Header;