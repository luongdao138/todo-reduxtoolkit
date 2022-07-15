import moment from 'moment';
import React, { memo, useEffect } from 'react'
import useCountdown from '../../hooks/useCountdown';

const DateTime = () => {
    const [currentTime, { startCountdown }] = useCountdown({
        countStart: Math.ceil(new Date().getTime() / 1000),
        isIncrement: true,
        intervalMs: 1000,
        countStop: Infinity
    });

    useEffect(() => {
        startCountdown()
    }, [])

  return (
    <div className='px-4 mb-8'>
          <h4 className='text-right font-semibold text-xl text-gray-800'>{moment(currentTime * 1000).format('dddd, MMMM Do YYYY, hh:mm:ss')}</h4>
    </div>
  )
}

export default memo(DateTime)