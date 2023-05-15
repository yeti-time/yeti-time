import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import EventCreationPage from './EventCreationPage.jsx';
import TimeTable from './TimeTable.jsx';

const App = () => {
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
