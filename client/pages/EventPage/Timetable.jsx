import React, { useState } from 'react';
import moment from 'moment';

import Date from './Date.jsx';

const Timetable = ({ event }) => {
  let { dates, times } = event;
  const { start: startTime, end: endTime } = times;
  
  dates = dates.map((date) => {
    return <Date key={date} date={date} startTime={startTime} endTime={endTime} />;
  });

  return (
    <div>
      {dates}
    </div>
  );
};

export default Timetable;