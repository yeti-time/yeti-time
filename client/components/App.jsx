import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EventCreationPage from './EventCreationPage';
// import InteractiveTimeTable from './InteractiveTimeTable'

const App = ({ id }) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EventCreationPage />} />
        {/* <Route path="/event/${id}" element={<InteractiveTimeTable />} /> */}
      </Routes>
    </div>
  );
};
export default App;