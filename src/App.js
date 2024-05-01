import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Reservations from "./pages/reservations";
import Tables from "./pages/tables";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="tables" element={<Tables />} />
          <Route path="reservations" element={<Reservations />} />
        </Routes>
      </Router>
  );
};

export default App;
