export default {
    name: 'todoHistory',
    type: 'document',
    title: 'Todo History',
    fields: [
        {
            name: 'type',
            type: 'string',
            title: 'Type',
        },
        {
            name: 'time',
            type: 'datetime',
            title: 'Time',
        },
        {
            name: 'todo_id',
            type: 'reference',
            title: 'Todo Id',
            to: [{ type: 'todo' }],
        },
    ],
};
