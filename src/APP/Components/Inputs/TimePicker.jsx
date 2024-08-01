import React, { useState } from 'react';
import moment from 'moment';


const TimeInput = () => {
  const [time, setTime] = useState('');

  const handleTimeChange = (event) => {
    const inputTime = event.target.value;
    const formattedTime = moment(inputTime, 'HH:mm').format('LT');
    setTime(formattedTime);
  };

  return (
    <div>
      <label htmlFor="time">Time</label>
      <input
        type="time"
        id="time"
        value={time}
        onChange={handleTimeChange}
        required={false}
      />
      {/* <p>Formatted Time: {time}</p> */}
    </div>
  );
};

export default TimeInput;
