import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CraftEditor from "./views/CraftEditor";
import Renderer from "./views/Renderer";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="preview" element={<Renderer />} />
        <Route index path="/" element={<CraftEditor />} />
      </Routes>
    </Router>
  );
}
