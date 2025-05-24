import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeartDiseaseForm from "./components/HeartDiseaseForm";
import Results from "./components/Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeartDiseaseForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;