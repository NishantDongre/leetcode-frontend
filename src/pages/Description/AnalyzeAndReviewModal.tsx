import React, { useState } from "react";
import axios from "axios";
import AceEditor from "react-ace";
import serverConfig from "../../config/serverConfig";

interface AnalyzeAndReviewModalProps {
  submissionStatus: string;
  submissionId: string;
  type: string;
  submittedCode: string;
  codeLanguage: string;
}

const AnalyzeAndReviewModal: React.FC<AnalyzeAndReviewModalProps> = ({
  submissionStatus,
  submissionId,
  type,
  submittedCode,
  codeLanguage,
}) => {
  const [modalText, setModalText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(2);
  const [reviewOnCode, setReviewOnCode] = useState<string>("");

  const fetchData = async (url: string) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      return response.data.data;
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong!");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getSubmissionAnalyze = async (submissionId: string) => {
    const submissionAnalyzeURL = `${serverConfig.SUBMISSION_SERVICE_HOSTNAME}/api/v1/submissions/${submissionId}/analyze`;
    const data = await fetchData(submissionAnalyzeURL);
    if (data) {
      setModalText(data);
      setIsModalOpen(true);
    }
  };

  const getSubmissionReview = async (submissionId: string) => {
    const submissionReviewURL = `${serverConfig.SUBMISSION_SERVICE_HOSTNAME}/api/v1/submissions/${submissionId}/review`;
    const data = await fetchData(submissionReviewURL);
    if (data) {
      setModalText(data.code);
      setReviewOnCode(data.comments);
      setIsModalOpen(true);
    }
  };

  const handleTabChange = (tabIndex: number) => setActiveTab(tabIndex);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-sm"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-white">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center">
        {submissionStatus === "TLE" ||
        submissionStatus === "SUCCESS" ||
        submissionStatus === "WA" ? (
          <button
            className="text-blue-400 hover:text-blue-300 underline"
            onClick={() =>
              type === "analyze"
                ? getSubmissionAnalyze(submissionId)
                : getSubmissionReview(submissionId)
            }
          >
            {type === "analyze" ? (
              <img src="/analyze.svg" alt="Analyze" />
            ) : (
              "View"
            )}
          </button>
        ) : (
          "-"
        )}
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-5xl bg-zinc-800">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg text-white mb-4">
              {type === "analyze" ? "Analyze" : "Review"}
            </h3>

            {/* DaisyUI Tabs */}
            <div role="tablist" className="tabs tabs-boxed mb-4">
              <a
                role="tab"
                className={`tab ${activeTab === 1 ? "tab-active" : ""}`}
                onClick={() => handleTabChange(1)}
              >
                Submitted Code
              </a>
              <a
                role="tab"
                className={`tab ${activeTab === 2 ? "tab-active" : ""}`}
                onClick={() => handleTabChange(2)}
              >
                {type === "analyze" ? "Analyze" : "Review"}
              </a>
            </div>

            {/* Tab Content */}
            <div className="max-h-[60vh] overflow-auto">
              {activeTab === 1 && (
                <AceEditor
                  mode={codeLanguage}
                  theme="twilight"
                  name="codeEditor"
                  value={submittedCode}
                  className="editor"
                  width="100%"
                  height="400px"
                  readOnly={true}
                  setOptions={{
                    wrap: true,
                  }}
                  showPrintMargin={false}
                />
              )}
              {activeTab === 2 && (
                <pre className="bg-zinc-900 rounded-lg w-[100%] h-[400px]">
                  <code className="text-white whitespace-pre-wrap">
                    {type === "analyze" ? (
                      <div className={type === "analyze" ? "p-4" : ""}>
                        {modalText}
                      </div>
                    ) : (
                      <>
                        <AceEditor
                          mode={codeLanguage}
                          theme="twilight"
                          name="codeEditor"
                          value={modalText + "\n" + "//" + reviewOnCode}
                          className="editor"
                          width="100%"
                          height="400px"
                          readOnly={true}
                          setOptions={{
                            wrap: true,
                          }}
                          showPrintMargin={false}
                        />
                      </>
                    )}
                  </code>
                </pre>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnalyzeAndReviewModal;
