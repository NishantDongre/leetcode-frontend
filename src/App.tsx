import "./App.css";

import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import SideBar from "./components/Sidebar";
import ProblemDescription from "./pages/Description/ProblemDescription";
import ProblemList from "./pages/ProblemList/ProblemList";
import AddProblem from "./pages/AddProblem";
import HomePage from "./pages/HomePage";
import UpdateProblem from "./pages/UpdateProblem";

function App() {
  return (
    <div className="h-[100vh] overflow-hidden">
      <Navbar />
      <SideBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problems/list" element={<ProblemList />} />
        <Route path="/problem/:problemId" element={<ProblemDescription />} />
        <Route path="/addProblem" element={<AddProblem />} />
        <Route path="/problem/update/:problemId" element={<UpdateProblem />} />
      </Routes>
    </div>
  );
}

export default App;
