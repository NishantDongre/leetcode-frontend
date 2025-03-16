import axios from "axios";
import { useEffect, useState } from "react";
import serverConfig from "../../config/serverConfig";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { AllProblemsApiResponse, Problem } from "../../types/types";

function ProblemList() {
  const [allProblems, setAllProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const problemListURL = `${serverConfig.PROBLEM_SERVICE_HOSTNAME}/api/v1/problems`;
        const response = await axios.get<AllProblemsApiResponse>(
          problemListURL
        );
        // Sort the problems by topic
        const sortedProblems = response.data.data.sort((a, b) => {
          if (a.topic < b.topic) return -1;
          if (a.topic > b.topic) return 1;
          return 0;
        });
        setAllProblems(sortedProblems);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage err={error} />;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col w-full overflow-hidden h-full px-3 py-2">
      <div className="overflow-x-auto">
        <table className="table w-full text-white">
          <thead>
            <tr className="bg-slate-900">
              <th className="font-bold text-lg">Title</th>
              <th className="font-bold text-lg">Difficulty</th>
              <th className="font-bold text-lg">Category</th>
            </tr>
          </thead>
          <tbody>
            {allProblems.map((problem, index) => (
              <tr
                key={problem._id}
                className={`hover:bg-zinc-700 ${
                  (index + 1) % 2 === 0 ? "bg-zinc-900" : ""
                }`}
              >
                <td>
                  <a
                    href={`/problem/${problem._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-focus hover:underline"
                  >
                    {problem.title}
                  </a>
                </td>
                <td>
                  <span
                    className={`badge ${
                      problem.difficulty === "easy"
                        ? "badge-success"
                        : problem.difficulty === "medium"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                <td>{problem.topic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProblemList;
