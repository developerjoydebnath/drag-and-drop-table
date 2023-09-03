export const column = () => {
    return [
        {
            accessorKey: 'firstName',
            id: 'firstName',
            header: 'First Name',
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
        },
        {
            accessorFn: (row) => row.lastName,
            id: 'lastName',
            cell: (info) => info.getValue(),
            header: 'Last Name',
            footer: (props) => props.column.id,
        },
        {
            accessorKey: 'age',
            id: 'age',
            header: 'Age',
            footer: (props) => props.column.id,
        },

        {
            accessorKey: 'height',
            id: 'height',
            header: 'Height',
            footer: (props) => props.column.id,
        },

        {
            accessorKey: 'weight',
            id: 'weight',
            header: 'Weight',
            footer: (props) => props.column.id,
        },
        {
            accessorKey: 'bloodGroup',
            id: 'bloodGroup',
            header: 'BloodGroup',
            footer: (props) => props.column.id,
        },
        {
            accessorKey: 'gender',
            id: 'gender',
            header: 'Gender',
            footer: (props) => props.column.id,
        },
        {
            accessorKey: 'eyeColor',
            id: 'eyeColor',
            header: 'Eye Color',
            footer: (props) => props.column.id,
        },
    ];
};
