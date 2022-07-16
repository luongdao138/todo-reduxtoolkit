import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField } from '@mui/material';
import { Todo, TodoPriority, TodoStatus } from '~/redux/todo/actions/types';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '~/redux/hooks';
import { addTodoAsync, updateTodo } from '~/redux/todo/actions';
import { priorityOptions, statusOptions } from '~/utils/todo';
import { NotificationType, useToastContext } from '~/context/ToastContext';
import { v4 as uuid } from 'uuid';

interface Props {
    onCloseModal: () => void;
    isEdit?: boolean;
    selectedItem?: Todo;
}

interface FormState {
    title: string;
    due_date: any;
    description: string;
    priority: TodoPriority;
    status?: TodoStatus;
}

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required!').max(50, 'Title can not be more than 20 characters!'),
    due_date: Yup.date().typeError('Due date is not valid!').required('Due date is required!'),
});

const initialValues: FormState = {
    title: '',
    due_date: new Date(),
    description: '',
    priority: TodoPriority.MEDIUM,
};

const AddTodoForm: React.FC<Props> = ({ onCloseModal, isEdit, selectedItem }) => {
    selectedItem = selectedItem ?? ({} as Todo);
    const dispatch = useAppDispatch();
    const { handleAddToast } = useToastContext();

    const handleSubmit = (values: FormState, helpers: FormikHelpers<FormState>) => {
        if (!isEdit) {
            dispatch(
                addTodoAsync({
                    ...values,
                    due_date: new Date(values.due_date).toISOString(),
                }),
            );

            // handleAddToast({
            //   type: NotificationType.SUCCESS,
            //   title: 'Success',
            //   desc: 'Add todo successfully!',
            //   id: uuid(),
            // });
        } else {
            if (
                values.description !== selectedItem?.description ||
                values.due_date !== selectedItem?.due_date ||
                values.priority !== selectedItem?.priority ||
                values.status !== selectedItem?.status ||
                values.title !== selectedItem?.title
            ) {
                dispatch(
                    updateTodo({
                        id: selectedItem?.id || '',
                        data: {
                            ...values,
                            due_date: new Date(values.due_date).toISOString(),
                        },
                    }),
                );
                handleAddToast({
                    type: NotificationType.SUCCESS,
                    title: 'Success',
                    desc: 'Edit todo successfully!',
                    id: uuid(),
                });
            }
        }
        onCloseModal();
        helpers.resetForm();
    };

    const formik = useFormik<FormState>({
        initialValues: !isEdit
            ? initialValues
            : {
                  title: selectedItem.title,
                  description: selectedItem.description || '',
                  due_date: selectedItem.due_date,
                  priority: selectedItem.priority,
                  status: selectedItem.status,
              },
        onSubmit: handleSubmit,
        validationSchema,
        enableReinitialize: true,
    });

    return (
        <form className="w-full">
            <h3 className="text-center text-2xl font-medium mb-4">{isEdit ? 'Edit todo' : 'Add New Todo'}</h3>
            <div>
                {/* Todo title */}
                <div className="mb-4">
                    <label className="mb-1 block font-medium" htmlFor="title">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Title"
                        className="border border-slate-300 rounded-md w-full px-4 py-3 outline-none"
                        {...formik.getFieldProps('title')}
                    />
                    {formik.touched.title && formik.errors.title && (
                        <span className="text-red-500 font-medium text-xs">{formik.errors.title}</span>
                    )}
                </div>

                {/* Todo description */}
                <div className="mb-4">
                    <label className="mb-1 block font-medium" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        placeholder="Description"
                        rows={4}
                        className="border border-slate-300 rounded-md w-full px-4 py-3 outline-none resize-none"
                        {...formik.getFieldProps('description')}
                    />
                </div>

                {/* Todo due date */}
                <div className="mb-4">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => (
                                <div className="mb-4">
                                    <label className="mb-1 block font-medium" htmlFor="due_date">
                                        Due date
                                    </label>
                                    <TextField
                                        sx={{
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                                padding: '0',
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                border: '1px solid rgb(203 213 225)',
                                                borderRadius: '0.375rem',
                                                padding: '.75rem 1.5rem .75rem 1rem',
                                                width: '100%',
                                            },
                                            '& .MuiOutlinedInput-root ': {
                                                paddingRight: '0',
                                            },
                                            '& .MuiInputAdornment-root': {
                                                position: 'absolute',
                                                right: '1rem',
                                            },
                                        }}
                                        id="due_date"
                                        InputProps={{
                                            disableUnderline: true,
                                            className:
                                                'border border-slate-300 rounded-md w-full px-4 py-3 outline-none',
                                        }}
                                        {...props}
                                        onBlur={formik.getFieldProps('due_date').onBlur}
                                        fullWidth
                                        label=""
                                        name="due_date"
                                    />

                                    {formik.touched.due_date && formik.errors.due_date && (
                                        <span className="text-red-500 font-medium text-xs">
                                            {formik.errors.due_date as string}
                                        </span>
                                    )}
                                </div>
                            )}
                            label="DateTimePicker"
                            value={formik.values.due_date}
                            onChange={(newValue) => {
                                formik.setFieldValue('due_date', newValue);
                            }}
                        />
                    </LocalizationProvider>
                </div>

                {/* Todo priority */}
                <div className="mb-4">
                    <label className="mb-1 block font-medium">Priority</label>
                    <div className="flex gap-2">
                        {priorityOptions.map((p) => (
                            <button
                                type="button"
                                key={p.value}
                                onClick={() => formik.setFieldValue('priority', p.value)}
                                className={`transition duration-200 ease-in-out text-xs px-3 py-1 font-medium border ${
                                    p.border
                                } rounded-md ${formik.values.priority === p.value ? 'text-white' : p.text_color} ${
                                    formik.values.priority === p.value ? p.bg_color : ''
                                }`}
                            >
                                {p.text}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Todo status */}
                {isEdit && (
                    <div className="mb-4">
                        <label className="mb-1 block font-medium">Status</label>
                        <div className="flex gap-2">
                            {statusOptions.map((p) => (
                                <button
                                    type="button"
                                    key={p.value}
                                    onClick={() => formik.setFieldValue('status', p.value)}
                                    className={`transition duration-200 ease-in-out text-xs px-3 py-1 font-medium border ${
                                        p.border
                                    } rounded-md ${formik.values.status === p.value ? 'text-white' : p.text_color} ${
                                        formik.values.status === p.value ? p.bg_color : ''
                                    }`}
                                >
                                    {p.text}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 justify-end">
                    <button className="rounded-md px-4 py-2" type="button" onClick={onCloseModal}>
                        Cancel
                    </button>
                    <button
                        className="rounded-md px-4 py-2 bg-green-500 text-white "
                        type="submit"
                        disabled={!formik.isValid}
                        onClick={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddTodoForm;
