import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  Countdown: {
    margin: '10px auto',
    paddingBottom: 20,
  },

  CountdownColumn: {
    display: 'inline-block',
  },

  CountdownElement: {
    display: 'inline-block',
    margin: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    '& strong': {
      fontSize: 20,
    },
  },
}));

const Countdown = ({ deadline = new Date() }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  });

  useEffect(() => {
    let internal = setInterval(() => {
      const date = calculateCountdown(deadline);
      date ? setState(date) : clearInterval(internal);
    }, 1000);
    return () => {
      clearInterval(internal);
    };
  }, [deadline]);

  const calculateCountdown = (endDate) => {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  };

  const addLeadingZeros = (value) => {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  };

  const countDown = state;

  return (
    <div className={classes.Countdown}>
      <span className={classes.CountdownColumn}>
        <span className={classes.CountdownElement}>
          <strong>{addLeadingZeros(countDown.days)}</strong>
          <span>{countDown.days === 1 ? 'Day' : 'Days'}</span>
        </span>
      </span>

      <span className={classes.CountdownColumn}>
        <span className={classes.CountdownElement}>
          <strong>{addLeadingZeros(countDown.hours)}</strong>
          <span>Hours</span>
        </span>
      </span>

      <span className={classes.CountdownColumn}>
        <span className={classes.CountdownElement}>
          <strong>{addLeadingZeros(countDown.min)}</strong>
          <span>Min</span>
        </span>
      </span>

      <span className={classes.CountdownColumn}>
        <span className={classes.CountdownElement}>
          <strong>{addLeadingZeros(countDown.sec)}</strong>
          <span>Sec</span>
        </span>
      </span>
    </div>
  );
};
export default Countdown;
