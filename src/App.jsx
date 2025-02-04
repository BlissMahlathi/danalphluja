import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RibsShowCase from "./pages/RibsShowCase";

const App = () => {
  return (
    <Router>
      <div>
        <RibsShowCase />
        <Routes>
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
