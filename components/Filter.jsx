export const Filter = ({ column, table }) => {
    const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();

    return typeof firstValue === 'number' ? (
        <div className="flex items-center space-x-2 pb-2">
            <input
                type="number"
                value={columnFilterValue?.[0] ?? ''}
                onChange={(e) => column.setFilterValue((old) => [e.target.value, old?.[1]])}
                placeholder={`Min`}
                className="w-20 border py-0.5 outline-0 ps-2 text-sm rounded placeholder:text-sm font-normal"
            />
            <input
                type="number"
                value={columnFilterValue?.[1] ?? ''}
                onChange={(e) => column.setFilterValue((old) => [old?.[0], e.target.value])}
                placeholder={`Max`}
                className="w-20 border py-0.5 outline-0 ps-2 text-sm rounded placeholder:text-sm font-normal"
            />
        </div>
    ) : (
        <input
            type="text"
            value={columnFilterValue ?? ''}
            onChange={(e) => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
            className="w-28 border py-0.5 outline-0 ps-2 text-sm rounded placeholder:text-sm font-normal"
        />
    );
};
