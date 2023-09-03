const Toggle = ({ table, className = '' }) => {
    return (
        <div className={className}>
            <div className="inline-block w-full">
                <div className="px-1 py-0.5 border-b border-slate-300">
                    <label>
                        <input
                            {...{
                                type: 'checkbox',
                                checked: table.getIsAllColumnsVisible(),
                                onChange: table.getToggleAllColumnsVisibilityHandler(),
                            }}
                        />
                        <span className="ms-1">Toggle All</span>
                    </label>
                </div>
                {table.getAllLeafColumns().map((column) => {
                    return (
                        <div key={column.id} className="px-1 py-0.5">
                            <label>
                                <input
                                    {...{
                                        type: 'checkbox',
                                        checked: column.getIsVisible(),
                                        onChange: column.getToggleVisibilityHandler(),
                                    }}
                                />
                                <span className="ms-1">{column.id}</span>
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Toggle;
