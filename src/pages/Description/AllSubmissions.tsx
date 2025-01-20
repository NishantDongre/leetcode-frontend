import axios from "axios";
import { useEffect, useState } from "react";
import AnalyzeAndReviewModal from "./AnalyzeAndReviewModal";
import serverConfig from "../../config/serverConfig";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

type SubmissionStatus =
  | "PENDING"
  | "SUCCESS"
  | "RE"
  | "TLE"
  | "MLE"
  | "WA"
  | "CE";
type ProgrammingLanguage = "c_cpp" | "java" | "python";

interface AllSubmissionsProps {
  userId: string;
  problemId: string | any;
}

interface Submission {
  _id: string;
  status: SubmissionStatus;
  language: ProgrammingLanguage;
  code: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  error: Record<string, unknown>;
  data: [];
}

const getStatusColor = (status: SubmissionStatus): string => {
  switch (status) {
    case "SUCCESS":
      return "text-green-500";
    case "WA":
    case "TLE":
    case "CE":
    case "RE":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const getSubmissionStatus = (status: SubmissionStatus): string => {
  switch (status) {
    case "SUCCESS":
      return "Accepted";
    case "WA":
      return "Wrong Answer";
    case "RE":
      return "Runtime Error";
    case "CE":
      return "Compile Error";
    case "TLE":
      return "Time Limit Exceeded";
    case "MLE":
      return "Memory Limit Exceeded";
    default:
      return "PENDING";
  }
};

const getSubmissionLanguage = (language: string): string => {
  switch (language) {
    case "c_cpp":
      return "CPP";
    case "java":
      return "JAVA";
    case "python":
      return "PYTHON";
    default:
      return "UNKNOWN";
  }
};

const getSubmissionDate = (codeSubmittedDate: string) => {
  const date = new Date(codeSubmittedDate);
  return date.toLocaleString();
};

const AllSubmissions: React.FC<AllSubmissionsProps> = ({
  userId,
  problemId,
}) => {
  const [allSubmissions, setAllSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCode, setSelectedCode] = useState<string>("");

  useEffect(() => {
    const fetchAllSubmissionsWithUserIdAndProblemId = async () => {
      try {
        setLoading(true);
        const submissionURL = `${serverConfig.SUBMISSION_SERVICE_HOSTNAME}/api/v1/submissions?userId=${userId}&problemId=${problemId}`;
        const response = await axios.get<ApiResponse>(submissionURL);
        setAllSubmissions(response.data.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching All Submissions"
        );
      } finally {
        setLoading(false);
      }
    };

    if (userId && problemId) {
      fetchAllSubmissionsWithUserIdAndProblemId();
    }
  }, []);

  const openCodeModal = (code: string) => {
    setSelectedCode(code);
    const modal = document.getElementById(
      "code_modal"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage err={error} />;
  }

  return (
    <>
      <div className="container mx-auto p-4 flex flex-col w-full overflow-hidden h-full px-3 py-2">
        <div className="overflow-x-auto">
          <table className="table w-full text-white flex items-center justify-center">
            <thead>
              <tr className="bg-slate-900">
                <th className="font-bold text-lg">Status</th>
                <th className="font-bold text-lg">Language</th>
                <th className="font-bold text-lg">
                  <div className="flex items-center justify-center">Code</div>
                </th>
                <th className="font-bold text-lg">Date</th>
                <th className="font-bold text-lg">
                  <div className="flex justify-center items-center">
                    Analyze
                  </div>
                </th>
                <th className="font-bold text-lg">
                  <div className="flex items-center justify-center">Review</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {allSubmissions.map((submission, index) => (
                <tr
                  key={submission._id}
                  className={`hover:bg-zinc-700 ${
                    (index + 1) % 2 === 0 ? "bg-zinc-900" : ""
                  }`}
                >
                  <td className={`${getStatusColor(submission.status)}`}>
                    {getSubmissionStatus(submission.status)}
                  </td>
                  <td className="">
                    <span className="bg-gray-700 px-2 py-1 rounded text-sm">
                      {getSubmissionLanguage(submission.language)}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-center">
                      <button
                        className="text-blue-400 hover:text-blue-300"
                        onClick={() => openCodeModal(submission.code)}
                      >
                        <img src="/code_eye.svg" alt="Code Eye Logo" />
                      </button>
                    </div>
                  </td>
                  <td className=" text-gray-400">
                    {getSubmissionDate(submission.createdAt)}
                  </td>
                  <td>
                    <AnalyzeAndReviewModal
                      submissionStatus={submission.status}
                      submissionId={submission._id}
                      type="analyze"
                      submittedCode={submission.code}
                      codeLanguage={submission.language}
                    />
                  </td>
                  <td>
                    <AnalyzeAndReviewModal
                      submissionStatus={submission.status}
                      submissionId={submission._id}
                      type="review"
                      submittedCode={submission.code}
                      codeLanguage={submission.language}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DaisyUI Modal */}
      <dialog id="code_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-zinc-800">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-white mb-4">Code</h3>
          <div className="max-h-[60vh] overflow-auto">
            <pre className="bg-zinc-900 p-4 rounded-lg">
              <code className="text-white whitespace-pre-wrap">
                {selectedCode}
              </code>
            </pre>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default AllSubmissions;
