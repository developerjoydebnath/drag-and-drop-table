'use client';

import React from 'react';

import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';

import { axiosInstance } from '@/utils/axios';
import { column } from './Column';
import { DraggableColumnHeader } from './DraggableColumnHeader';
import { DraggableRow } from './DraggableRow';
import Pagination from './Pagination';
import Toggle from './Toggle';

// get the columns
const defaultColumns = column();

export default function Table() {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [columns] = React.useState(() => [...defaultColumns]);

    const [columnOrder, setColumnOrder] = React.useState(
        columns.map((column) => column.id), //must start out with populated columnOrder so we can splice
    );

    const reorderRow = (draggedRowIndex, targetRowIndex) => {
        console.log(draggedRowIndex, targetRowIndex);
        data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0]);
        setData([...data]);
    };

    const resetOrder = () => setColumnOrder(columns.map((column) => column.id));

    const [columnVisibility, setColumnVisibility] = React.useState({});

    // get all users
    React.useEffect(() => {
        setLoading(true);
        (async () => {
            const res = await axiosInstance.get('/users');
            setData(res?.data?.users);
            setLoading(false);
        })();
    }, []);

    const table = useReactTable({
        data,
        columns,
        state: {
            columnOrder,
            columnVisibility,
        },
        getRowId: (row) => row.userId,
        onColumnOrderChange: setColumnOrder,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    if (loading) {
        return (
            <div className="text-center">
                <h1 className="text-5xl font-semibold mt-10">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="p-2">
            {/* reset and filter component */}
            <div className="flex mt-10 mb-5 justify-end me-10 gap-5">
                <button onClick={() => resetOrder()} className="border px-2 py-1 bg-slate-200 rounded">
                    Reset Order
                </button>
                <div className="border px-2 py-1 bg-slate-200 rounded group relative">
                    <span className="cursor-pointer">Filters</span>
                    <Toggle
                        className="absolute w-40 top-full right-0 bg-slate-100 group-hover:block hidden border shadow-md px-2 py-2 rounded-md"
                        table={table}
                    />
                </div>
            </div>

            <div className="overflow-y-scroll">
                <table className="w-full min-w-[600px]">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border px-3 text-start">
                                <th className="bg-slate-200 px-[10px]"></th>
                                {headerGroup.headers.map((header) => (
                                    <DraggableColumnHeader key={header.id} header={header} table={table} />
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {/* {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border px-3 text-start">
                                {row.getVisibleCells().map((cell) => (
                                    <td className="text-start px-[10px]" key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))} */}
                        {table.getRowModel().rows.map((row) => (
                            <DraggableRow key={row.id} row={row} reorderRow={reorderRow} />
                        ))}
                    </tbody>
                </table>
                {/* Pagination component */}
                <Pagination table={table} />
            </div>
        </div>
    );
}
