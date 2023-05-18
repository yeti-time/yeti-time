import React, { useEffect } from 'react';
import moment from 'moment';

import Timeslot from './Timeslot.jsx';

const Date = ({ date, startTime, endTime }) => {
  // create an array of Timeslot components
  const timeslots = [];

  // use moment to allow 'adding' to these times
  startTime = moment(startTime, 'h:mm A');
  endTime = moment(startTime, 'h:mm A');
  
  // add Timeslots from startTime to endTime
  let currTime = startTime;
  while (currTime < endTime) {
    // format moment object back into a string
    const time = currTime.format('h:mm A');
    timeslots.push(<Timeslot key={time} time={time} />);

    // increment by 30 minutes
    currTime.add(30, 'minutes');
  }

  return (
    <div>
      <label>{date}</label>
      {timeslots}
    </div>
  );
};

export default Date;