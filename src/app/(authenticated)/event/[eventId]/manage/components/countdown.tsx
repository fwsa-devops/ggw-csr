'use client';

import { useEffect } from 'react';
import useTimer from 'easytimer-react-hook';
import moment from 'moment';


const Countdown = ({ dateTime }: { dateTime: Date }) => {

  const [timer, isTargetAchieved] = useTimer({
    countdown: false,
    startValues: {
      days: (new Date().getDate() - dateTime.getDate()),
      hours: (new Date().getHours() - dateTime.getHours()),
      minutes: (new Date().getMinutes() - dateTime.getMinutes()),
      seconds: (new Date().getSeconds() - dateTime.getSeconds())
    },
    target: { seconds: 0 }
  })


  useEffect(() => {
    console.log('dateTime', dateTime);
    console.log('timer', timer.getConfig());
    timer.start()
  }, [])

  return (
    <>
      {
        timer.getTimeValues().days === 0 &&
        <span suppressHydrationWarning>
          {
            timer.getTimeValues().hours > 0 && timer.getTimeValues().hours + ' hours '
          }
          {
            timer.getTimeValues().minutes > 0 && timer.getTimeValues().minutes + ' minutes '
          }
          {
            timer.getTimeValues().seconds + ' seconds '
          }
        </span>
      }

      {
        timer.getTimeValues().days > 0 &&
        <span suppressHydrationWarning>
          {moment(dateTime).fromNow()}
        </span>
      }
    </>
  )

}

export default Countdown;