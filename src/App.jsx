import { Routes, Route } from "react-router-dom";
import LibraryHall from "./scenes/LibraryHall";
import ArchiveWing from "./scenes/ArchiveWing";
import JudgementChamber from "./scenes/JudgementChamber";

function App() {
  return (
    <div className="min-h-screen text-bone font-serif">
      <Routes>
        <Route path="/" element={<LibraryHall />} />
        <Route path="/archives" element={<ArchiveWing />} />
        <Route path="/judgement" element={<JudgementChamber />} />
      </Routes>
    </div>
  );
}

export default App;