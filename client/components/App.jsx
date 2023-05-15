import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EventCreationPage from './EventCreationPage';
import TimeTable from './TimeTable.jsx';

const App = ({ id }) => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<EventCreationPage />} />
        <Route path='/event/:id' element={<TimeTable />} />
      </Routes>
    </div>
  );
};
export default App;
