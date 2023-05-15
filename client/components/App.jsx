import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventCreationPage from './EventCreationPage.jsx';
import TimeTable from './TimeTable.jsx';

const App = ({ id }) => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<EventCreationPage />} />
          <Route path='/event/:id' element={<TimeTable />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
