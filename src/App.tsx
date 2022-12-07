import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import ROUTES, { ROUTES_PATH } from './helper/routes';

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
          <Route
              path="*"
              element={<Navigate to={ROUTES_PATH.LOGIN} replace />}
          />
      </Routes>
    </Router>
  );
};

export default App;
