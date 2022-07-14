import React from 'react';
import { Todo } from '../../redux/todo/actions/types';
import { formatDate } from '../../utils/todo';

interface Props {
  selectedItem: Todo | undefined;
  onCloseModal: () => void;
}

const TodoDetail: React.FC<Props> = ({ onCloseModal, selectedItem }) => {
  if (!selectedItem) return null;
  return (
    <div>
      <h1 className='text-center text-2xl font-semibold mb-4'>Todo Detail</h1>

      <div>
        <div className='mb-2'>
          <p className='font-medium'>Title</p>
          <p className=''>{selectedItem.title}</p>
        </div>
        <div className='mb-2'>
          <p className='font-medium'>Description</p>
          <p className=''>{selectedItem.description}</p>
        </div>
        <div className='mb-2'>
          <p className='font-medium'>Status</p>
          <p className=''>{selectedItem.status}</p>
        </div>
        <div className='mb-2'>
          <p className='font-medium'>Priority</p>
          <p className=''>{selectedItem.priority}</p>
        </div>
        <div className='mb-2'>
          <p className='font-medium'>Created At</p>
          <p className=''>
            {formatDate(selectedItem.created_at, { withDateTime: true })}
          </p>
        </div>
        <div className='mb-2'>
          <p className='font-medium'>Due date</p>
          <p className=''>
            {formatDate(selectedItem.due_date, { withDateTime: true })}
          </p>
        </div>
        <div>
          <p className='font-medium'>History</p>

          {selectedItem.status_histories.map((h) => (
            <div className='flex gap-2'>
              <p className=''>
                Time: {formatDate(h.time, { withDateTime: true })}
              </p>
              <span> / </span>
              <p className=''>Type: {h.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
