import React, { useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import useFirstRender from '../../hooks/useFirstRender';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getTodoFilter } from '../../redux/todoAction/selectors';
import { updateFilter } from '../../redux/todoAction/todoAction.slice';

const SearchTodo = () => {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce(value, 450);
  const dispatch = useAppDispatch()
  const todoFilter = useAppSelector(getTodoFilter) ?? {};
  const isFirstRender = useFirstRender()
  
  useEffect(() => {
      if(!isFirstRender) 
         dispatch(updateFilter({ ...todoFilter, title: debouncedValue.trim() }))
  }, [debouncedValue])
  
  return (
    <div className='mt-4'>
         <input className='w-full font-medium rounded-md outline-none py-3 px-4'
                value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder='Search todos...' />
    </div>
  )
}

export default SearchTodo