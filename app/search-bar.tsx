"use client"
import { Autocomplete, TextField, Box, Typography, Chip } from '@mui/material';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { useCurrentDirection } from './menu';
import { StockInfo } from '@/api';

const Header: React.FC<{
    stocks: StockInfo[]
}> = ({ stocks }) => {
    
    const router = useRouter()
    const currentDirection = useCurrentDirection()

    const handleStockSelect = (stock: StockInfo | null) => {
        if (stock && currentDirection) {
            router.push(`${currentDirection.path}/${stock.stock_id}`);
        }
    };

    return (
        <header className="h-16 bg-white flex items-center justify-center shadow-sm border-b border-gray-100">
            <Box className="w-full max-w-2xl px-4">
                <Autocomplete
                    options={stocks}
                    getOptionLabel={(option) => `${option.stock_name} (${option.stock_id})`}
                    onChange={(_, value) => handleStockSelect(value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="輸入股 / 真股代號 · 董事會公司簡介"
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    backgroundColor: '#f8f9fa',
                                    '&:hover': {
                                        backgroundColor: '#f1f3f4',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: '#ffffff',
                                        boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
                                    },
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e0e0e0',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#1976d2',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#1976d2',
                                },
                            }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <Box component="li" {...props} sx={{ py: 1 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {option.stock_name}
                                </Typography>
                                <Chip 
                                    label={option.stock_id} 
                                    size="small" 
                                    sx={{ 
                                        alignSelf: 'flex-start', 
                                        mt: 0.5,
                                        backgroundColor: '#e3f2fd',
                                        color: '#1976d2',
                                        fontSize: '0.75rem',
                                        height: '20px'
                                    }} 
                                />
                            </Box>
                        </Box>
                    )}
                    filterOptions={(options, { inputValue }) => {
                        const filtered = options.filter((option) =>
                            option.stock_name.toLowerCase().includes(inputValue.toLowerCase()) ||
                            option.stock_id.toLowerCase().includes(inputValue.toLowerCase())
                        );
                        return filtered.slice(0, 100); // Limit to 10 results
                    }}
                    noOptionsText="沒有找到相關股票"
                    loadingText="搜尋中..."
                    sx={{
                        '& .MuiAutocomplete-paper': {
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            borderRadius: 2,
                            border: '1px solid #e0e0e0',
                        },
                        '& .MuiAutocomplete-listbox': {
                            padding: 0,
                        },
                        '& .MuiAutocomplete-option': {
                            padding: '8px 16px',
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                            },
                            '&[aria-selected="true"]': {
                                backgroundColor: '#e3f2fd',
                            },
                        },
                    }}
                />
            </Box>
        </header>
    );
}

export default Header;