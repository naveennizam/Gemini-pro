import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tax from "./tax-calculator";
import Form from "./dynamic_form";
import NameGenerator from "./name_generator";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/form" element={<Tax />} />
          <Route path="/" element={<Form />} />
          <Route path="/name" element={<NameGenerator />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
