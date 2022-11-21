import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import ROUTES from './helper/routes';

const App = () => {
  return (
    <Router>
      <Routes>
        {ROUTES.map((route, idx) => (
          <Route
            key={`${route.path}-${idx}`}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
