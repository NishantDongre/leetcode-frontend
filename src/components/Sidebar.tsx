import { useEffect, useState } from "react";
import { AllProblemsApiResponse, Problem } from "../types/types";
import serverConfig from "../config/serverConfig";
import axios from "axios";
import { Link } from "react-router-dom";

function SideBar() {
  const [topProblems, setTopProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const problemListURL = `${serverConfig.PROBLEM_SERVICE_HOSTNAME}/api/v1/problems/top?limit=5`;
        const response = await axios.get<AllProblemsApiResponse>(
          problemListURL
        );
        setTopProblems(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="drawer z-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="text-green-500 z-50 font-bold p-8 text-xl">
          Top Problems
        </div>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li className="mt-10">
            <a></a>
          </li>
          {topProblems.map((problem) => (
            <li
              className="bg-gray-900 rounded-3xl m-4 p-1 text-xs"
              key={problem._id}
            >
              <Link to={`problem/${problem._id}`}>{problem.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
