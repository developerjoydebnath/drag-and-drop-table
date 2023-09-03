import { flexRender } from '@tanstack/react-table';
import { useDrag, useDrop } from 'react-dnd';
import { Filter } from './Filter';

const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
    columnOrder.splice(
        columnOrder.indexOf(targetColumnId),
        0,
        columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0],
    );
    return [...columnOrder];
};

export const DraggableColumnHeader = ({ header, table }) => {
    const { getState, setColumnOrder } = table;
    const { columnOrder } = getState();
    const { column } = header;

    const [, dropRef] = useDrop({
        accept: 'column',
        drop: (draggedColumn) => {
            const newColumnOrder = reorderColumn(draggedColumn.id, column.id, columnOrder);
            setColumnOrder(newColumnOrder);
        },
    });

    const [{ isDragging }, dragRef, previewRef] = useDrag({
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        item: () => column,
        type: 'column',
    });

    return (
        <th
            ref={dropRef}
            colSpan={header.colSpan}
            style={{ opacity: isDragging ? 0.5 : 1, textAlign: 'left', padding: '0 10px' }}
            className="hover:cursor-grab bg-slate-200"
        >
            <div ref={dragRef} className="">
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
            </div>
            <div className="">
                {header.column.getCanFilter() ? (
                    <div>
                        <Filter column={header.column} table={table} />
                    </div>
                ) : null}
            </div>
        </th>
    );
};
