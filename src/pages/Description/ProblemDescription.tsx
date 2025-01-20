import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";

import axios from "axios";
import DOMPurify from "dompurify";
import { DragEvent, useEffect, useRef, useState } from "react";
import AceEditor from "react-ace";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import io from "socket.io-client";

import Timer from "../../components/Timer";
import Languages from "../../constants/Languages";
import Themes from "../../constants/Themes";
import CompilationResult from "../../components/CompilationResult";

import {
  CodeSubmissionResultType,
  AceEditorLanguageType,
  AceEditorThemeType,
} from "../../types/types";
import AllSubmissions from "./AllSubmissions";
import serverConfig from "../../config/serverConfig";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function Description() {
  const [activeTab, setActiveTab] = useState("statement");
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [language, setLanguage] = useState("c_cpp");
  const [theme, setTheme] = useState("twilight");
  const [code, setCode] = useState("");
  const [codeStubs, setCodeStubs] = useState([]);
  const [testCaseTab, setTestCaseTab] = useState("input");
  const [customTestCaseInput, setCustomTestCaseInput] = useState("");

  const consoleCheckboxRef = useRef<HTMLInputElement>(null);
  const { problemId } = useParams();
  const [descriptionText, setDescriptionText] = useState(
    "Default Problem Description"
  );
  const [editorialText, setEditorialText] = useState("Editorial");
  const [problemTitle, setProblemTitle] = useState("");
  const [problemDifficulty, setProblemDifficulty] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCodeSubmissionLoading, setIsCodeSubmissionLoading] =
    useState<boolean>(false);
  const [sanitizedMarkdown, setSanitizedMarkdown] = useState(
    DOMPurify.sanitize(descriptionText)
  );
  const [userId, setUserId] = useState("");
  const [codeSubmissionResult, setCodeSubmissionResult] =
    useState<CodeSubmissionResultType>({});

  // Socket Server Events
  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = crypto.randomUUID();
      localStorage.setItem("userId", newUserId);
      storedUserId = newUserId;
      setUserId(newUserId);
    }

    const socketIo = io(serverConfig.SOCKET_SERVICE_HOSTNAME);

    socketIo.emit("client-connected-event", {
      userIdPlusProblemId: storedUserId + "," + problemId,
    });

    socketIo.on("code-submission-response", (data) => {
      console.log(data);
      setIsCodeSubmissionLoading(false);
      setCodeSubmissionResult(data.responseSendToUser);
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  // Problem Fetching
  useEffect(() => {
    const fetchDescription = async () => {
      try {
        setLoading(true);
        const problemURL = `${serverConfig.PROBLEM_SERVICE_HOSTNAME}/api/v1/problems/${problemId}`;
        const response = await axios.get(problemURL);
        setDescriptionText(response.data.data.description);
        setEditorialText(response.data.data.editorial);
        setProblemTitle(response.data.data.title);
        setProblemDifficulty(response.data.data.difficulty);
        setSanitizedMarkdown(
          DOMPurify.sanitize(response.data.data.description)
        );
        setCodeStubs(response.data.data.codeStubs);
        const languageCodeStub: any = response.data.data.codeStubs.find(
          (codeStub: {
            language: string;
            startSnippet: string;
            userSnippet: string;
            endSnippet: string;
          }) => codeStub.language.toLowerCase() === language
        );
        setCode(languageCodeStub?.userSnippet);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDescription();
  }, [problemId]);

  // Set Ace Editor Language specific User Starter Code
  useEffect(() => {
    const languageCodeStub: any = codeStubs.find(
      (codeStub: {
        language: string;
        startSnippet: string;
        userSnippet: string;
        endSnippet: string;
      }) => codeStub.language.toLowerCase() === language
    );
    setCode(languageCodeStub?.userSnippet);
  }, [language]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage err={error} />;
  }

  async function handleSubmission() {
    try {
      //Open Console
      if (consoleCheckboxRef.current) {
        consoleCheckboxRef.current.checked = true;
      }
      setTestCaseTab("output");
      setIsCodeSubmissionLoading(true);

      const submissionURL = `${serverConfig.SUBMISSION_SERVICE_HOSTNAME}/api/v1/submissions/`;
      const response = await axios.post(submissionURL, {
        code,
        language,
        userId,
        problemId,
        isCustomTestCase: false,
      });
      console.log(response.data.data, userId);
    } catch (error) {
      console.log(error);
    }
  }

  const handleRunCode = async () => {
    try {
      //Open Console
      if (consoleCheckboxRef.current) {
        consoleCheckboxRef.current.checked = true;
      }
      setTestCaseTab("output");
      setIsCodeSubmissionLoading(true);
      const submissionURL = `${serverConfig.SUBMISSION_SERVICE_HOSTNAME}/api/v1/submissions/`;
      const response = await axios.post(submissionURL, {
        code,
        language,
        userId,
        problemId,
        isCustomTestCase: true,
        testCases: [{ input: customTestCaseInput, output: "" }],
      });
      console.log(response.data.data, userId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        console.log("Code Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const isConsoleInputTabActive = (tabName: string) => {
    if (testCaseTab === tabName) {
      return "tab tab-active";
    } else {
      return "tab";
    }
  };

  const startDragging = (e: DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const stopDragging = (e: DragEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
    }
    e.preventDefault();
  };

  const onDrag = (e: DragEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    if (newLeftWidth > 10 && newLeftWidth < 90) {
      setLeftWidth(newLeftWidth);
    }
  };

  const handleActiveTabs = async (tabName: string) => {
    setActiveTab(tabName);

    if (tabName === "statement") {
      setSanitizedMarkdown(DOMPurify.sanitize(descriptionText));
      // setSanitizedMarkdown(descriptionText);
    } else if (tabName === "editorial") {
      // setSanitizedMarkdown(DOMPurify.sanitize(editorialText));
      setSanitizedMarkdown(editorialText);
    }
  };

  const handleResetCode = () => {
    const languageCodeStub: any = codeStubs.find(
      (codeStub: {
        language: string;
        startSnippet: string;
        userSnippet: string;
        endSnippet: string;
      }) => codeStub.language.toLowerCase() === language
    );
    setCode(languageCodeStub?.userSnippet);
  };

  const getActiveTabClass = (tabName: string) => {
    if (activeTab === tabName) {
      return "tab tab-active font-bold";
    } else {
      return "tab";
    }
  };

  return (
    <div
      className="flex w-screen h-[calc(100vh-68px)]"
      onMouseMove={onDrag}
      onMouseUp={stopDragging}
    >
      <div
        className="flex flex-col leftPanel h-full overflow-auto relative"
        style={{ width: `${leftWidth}%` }}
      >
        <div role="tablist" className="tabs tabs-bordered flex-shrink-0">
          <a
            onClick={() => handleActiveTabs("statement")}
            role="tab"
            className={getActiveTabClass("statement")}
          >
            Problem Statement
          </a>
          <a
            onClick={() => handleActiveTabs("editorial")}
            role="tab"
            className={getActiveTabClass("editorial")}
          >
            Editorial
          </a>
          <a
            onClick={() => handleActiveTabs("submissions")}
            role="tab"
            className={getActiveTabClass("submissions")}
          >
            Submissions
          </a>
        </div>

        {activeTab !== "submissions" ? (
          <>
            {activeTab === "statement" ? (
              <>
                <p className="text-2xl font-bold pt-5 pr-5 pl-5 mb-0">
                  {problemTitle}
                </p>
                <span
                  className={`ml-5 mt-3 badge ${
                    problemDifficulty === "easy"
                      ? "badge-success"
                      : problemDifficulty === "medium"
                      ? "badge-warning"
                      : "badge-error"
                  }`}
                >
                  {problemDifficulty}
                </span>
              </>
            ) : (
              ""
            )}
            <div className="markdownViewer p-[20px] basis-1/2 flex-1">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                className="prose"
              >
                {sanitizedMarkdown}
              </ReactMarkdown>
            </div>

            <div className="flex-shrink-0 bottom-0 sticky collapse rounded-none bg-consoleStripColor transition-all duration-900">
              <input
                id="customTestCaseConsole"
                type="checkbox"
                className="peer"
                ref={consoleCheckboxRef}
              />
              <div className="collapse-title h-2 text-customInputTextColor peer-checked:bg-consoleStripColor peer-checked:text-customInputTextColor">
                Console
              </div>
              <div className="collapse-content text-customInputTextColor peer-checked:bg-runCodeSubmitStrip peer-checked:text-customInputTextColor peer-checked:h-[35vh] peer-checked:overflow-auto">
                <div role="tablist" className="tabs tabs-bordered w-3/5 mb-4">
                  <a
                    onClick={() => setTestCaseTab("input")}
                    role="tab"
                    className={isConsoleInputTabActive("input")}
                  >
                    Custom Input
                  </a>
                  <a
                    onClick={() => setTestCaseTab("output")}
                    role="tab"
                    className={isConsoleInputTabActive("output")}
                  >
                    Compilation Results
                  </a>
                </div>
                <div className="h-full">
                  {testCaseTab === "input" ? (
                    <textarea
                      rows={4}
                      cols={70}
                      className="bg-runCodeSubmitStrip border-slate-700 border-2 text-white rounded-md resize-none"
                      onChange={(e) => setCustomTestCaseInput(e.target.value)}
                      value={customTestCaseInput}
                    />
                  ) : (
                    <div className="h-[100%]">
                      <CompilationResult
                        result={codeSubmissionResult}
                        loading={isCodeSubmissionLoading}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <AllSubmissions userId={userId} problemId={problemId} />
        )}
      </div>

      <div
        className="cursor-col-resize w-[4px] bg-slate-200 h-full flex flex-col justify-center"
        onMouseDown={startDragging}
      >
        <div className="text-black font-extrabold m-0 p-0 flex flex-col items-center leading-[0.8]">
          <div className="m-0 p-0">|</div>
          <div className="m-0 p-0">|</div>
          <div className="m-0 p-0">|</div>
        </div>
      </div>

      <div
        className="rightPanel h-full overflow-auto flex flex-col"
        style={{ width: `${100 - leftWidth}%` }}
      >
        <div className="flex gap-x-1.5 justify-between items-center px-6 py-2 basis-[5%]">
          <div className="flex gap-3">
            <div>
              <select
                className="select select-accent w-full select-sm max-w-xs"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {Languages.map((language: AceEditorLanguageType) => (
                  <option key={language.value} value={language.value}>
                    {language.languageName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                className="select select-accent w-full select-sm max-w-xs"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                {Themes.map((theme: AceEditorThemeType) => (
                  <option key={theme.value} value={theme.value}>
                    {theme.themeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Timer />

          <div className="flex gap-4 justify-center items-center">
            <div>
              <button onClick={handleCopyToClipboard}>
                <IoCopyOutline />
              </button>
            </div>
            <div>
              <button onClick={() => handleResetCode()}>
                <FaArrowRotateLeft />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col editor-console grow-[1]">
          <div className="editorContainer grow-[1]">
            <AceEditor
              mode={language}
              theme={theme}
              name="codeEditor"
              value={code}
              onChange={(e: string) => setCode(e)}
              className="editor"
              style={{ width: "100%" }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                showLineNumbers: true,
                fontSize: 16,
              }}
              height="100%"
            />
          </div>
          <div>
            <div className="flex gap-x-1.5 items-center justify-end px-2 py-2 bg-runCodeSubmitStrip">
              <label htmlFor="customTestCaseConsole">
                <div className="text-xs cursor-pointer underline text-customInputTextColor">
                  Custom Input
                </div>
              </label>
              <button
                onClick={handleRunCode}
                className="btn bg-runCodeBtnColor btn-sm"
              >
                Run Code
              </button>
              <button
                onClick={handleSubmission}
                className="btn bg-submitBtnColor btn-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
