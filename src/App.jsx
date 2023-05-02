import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// components
import { Home } from "./screens/Home";
import { Details } from "./screens/Details";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
