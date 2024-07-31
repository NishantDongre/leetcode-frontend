import "./App.css";

import Navbar from "./components/Navbar";
import SideBar from "./components/Sidebar";
import SampleProblem1 from "./constants/SampleProblem1";
import ProblemDescription from "./pages/Description/ProblemDescription";

function App() {
    const markdownText = SampleProblem1.problemStatement;
    return (
        <div className="h-[100vh]">
            <Navbar />
            <SideBar />
            <ProblemDescription descriptionText={markdownText} />
        </div>
    );
}

export default App;
