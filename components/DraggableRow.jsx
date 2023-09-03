import Icon from '@/icons/Icon';
import { flexRender } from '@tanstack/react-table';
import { useDrag, useDrop } from 'react-dnd';

export const DraggableRow = ({ row, reorderRow }) => {
    const [, dropRef] = useDrop({
        accept: 'row',
        drop: (draggedRow) => reorderRow(draggedRow.index, row.index),
    });

    const [{ isDragging }, dragRef, previewRef] = useDrag({
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        item: () => row,
        type: 'row',
    });

    return (
        <tr
            ref={previewRef} //previewRef could go here
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="border"
        >
            <td ref={dropRef} className="px-3 text-start">
                <button className="cursor-grab" ref={dragRef}>
                    <Icon name="move" className="h-5 w-5 fill-slate-500" />
                </button>
            </td>
            {row.getVisibleCells().map((cell) => (
                <td className="px-3" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            ))}
        </tr>
    );
};
