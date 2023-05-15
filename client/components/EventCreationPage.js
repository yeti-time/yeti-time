import React, { useState } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import './Cal.css'

function EventCreationPage() {
  const [dates, setSelectedDates] = useState([]);
  const [name, setName] = useState("")
  const [startTime, setStartTime] = useState('12:00')
  const [endTime, setEndTime] = useState('12:30')

  const navigate = useNavigate()

  const handleClick = (selectedDates) => {
    if (Array.isArray(selectedDates)) {
      const formattedDates = selectedDates.map((date) =>
        moment(date).format('MMMM Do YYYY')
      );
      setSelectedDates([...dates, ...formattedDates]);
    } else {
      const formattedDate = moment(selectedDates).format('MMMM Do YYYY');
      setSelectedDates([...dates, formattedDate]);
    }
  };

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handleStartTime = (time) => {
    setStartTime(time);
  }
  const handleEndTime = (time) => {
    setEndTime(time);
  }

  const handleCreateEvent = () => {
    const event = {
      name: name,
      dates: dates,
      times: {start: startTime, end: endTime},
    };

    fetch('/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then((response) => response.json())
      .then((data) => {
            const id = data._id
            const dates = data.dates
            console.log(id)
            console.log(dates)
            navigate(`/event/${id}`)
      })
      .catch((error) => {
        console.error(error);
      });

    console.log('click')
  };
  

  return (
    <div className='Yeti'>
        <div className='calenderSection'>  
            <h1 className='text-center'> Yeti Time </h1>
            <h2> What Days Would You Like to Meet?</h2>
            <div className='calender-container'>
            <Calendar onChange={handleClick} minDate={new Date()} />
            </div>
        </div>
        <div className='formSection'>
        <div>
            <label className="eventName">Name of your Event </label>
            <br></br>
            <input type="text" placeholder='Event Name' value={name} onChange={handleName}/>
        </div>

        <div className='timePickers'>
            <TimePicker 
                onChange={handleStartTime}
                value={startTime}
                clearIcon={null}
                disableClock={true}
                minuteInterval={30}
            /> 
            <h2>      to             </h2>
            <TimePicker 
                onChange={handleEndTime}
                value={endTime}
                clearIcon={null}
                disableClock={true}
            /> 
        </div>

        <div>
            <button onClick={handleCreateEvent}>Create Event</button>
        </div>
        </div>
    </div>
  );
}

export default EventCreationPage;