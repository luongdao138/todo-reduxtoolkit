import React from 'react';

interface Props {
  okAction: () => void;
  cancelAction: () => void;
  title: string;
  subtitle?: string;
}

const ConfirmAction: React.FC<Props> = ({
  cancelAction,
  okAction,
  title,
  subtitle,
}) => {
  return (
    <div className='w-full'>
      <h2 className='mt-4'>{title}</h2>
      <p className='mb-4'>{subtitle}</p>
      <div className='flex gap-2 justify-end'>
        <button
          className='px-3 py-2 text-white text-sm font-medium rounded-md bg-red-500'
          onClick={cancelAction}
        >
          Cancel
        </button>
        <button
          className='px-3 py-2 text-white text-sm font-medium rounded-md bg-green-500'
          onClick={okAction}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ConfirmAction;
