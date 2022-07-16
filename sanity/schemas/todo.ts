export default {
    name: 'todo',
    type: 'document',
    title: 'Todo',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
        },
        {
            name: 'description',
            type: 'string',
            title: 'Description',
        },
        {
            name: 'due_date',
            type: 'datetime',
            title: 'Due Date',
        },
        {
            name: 'status',
            type: 'string',
            title: 'Status',
        },
        {
            name: 'priority',
            type: 'string',
            title: 'Priority',
        },
        {
            name: 'created_at',
            type: 'datetime',
            title: 'Created At',
        },
        {
            name: 'updated_at',
            type: 'datetime',
            title: 'Updated At',
        },
        {
            name: 'is_deleted',
            type: 'boolean',
            title: 'Is Deleted',
        },
    ],
};
