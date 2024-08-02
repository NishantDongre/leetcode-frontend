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

import DOMPurify from "dompurify";
import { DragEvent, useState } from "react";
import AceEditor from "react-ace";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import Timer from "../../components/Timer";
import Languages from "../../constants/Languages";
import Themes from "../../constants/Themes";

type languageSupport = {
    languageName: string;
    value: string;
};

type themeStyle = {
    themeName: string;
    value: string;
};

function Description({ descriptionText }: { descriptionText: string }) {
    const sanitizedMarkdown = DOMPurify.sanitize(descriptionText);
    const [activeTab, setActiveTab] = useState("statement");
    const [leftWidth, setLeftWidth] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const [language, setLanguage] = useState("c_cpp");
    const [theme, setTheme] = useState("twilight");
    const [code, setCode] = useState("");

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

    const isActiveTab = (tabName: string) => {
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
                className="leftPanel h-full overflow-auto"
                style={{ width: `${leftWidth}%` }}
            >
                <div role="tablist" className="tabs tabs-bordered">
                    <a
                        onClick={() => setActiveTab("statement")}
                        role="tab"
                        className={isActiveTab("statement")}
                    >
                        Problem Statement
                    </a>
                    <a
                        onClick={() => setActiveTab("editorial")}
                        role="tab"
                        className={isActiveTab("editorial")}
                    >
                        Editorial
                    </a>
                    <a
                        onClick={() => setActiveTab("submissions")}
                        role="tab"
                        className={isActiveTab("submissions")}
                    >
                        Submissions
                    </a>
                </div>

                <div className="markdownViewer p-[20px] basis-1/2">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {sanitizedMarkdown}
                    </ReactMarkdown>
                </div>
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
                className="rightPanel h-full overflow-auto"
                style={{ width: `${100 - leftWidth}%` }}
            >
                <div className="flex gap-x-1.5 justify-between items-center px-6 py-2">
                    <div className="flex gap-3">
                        <div>
                            <select
                                className="select select-accent w-full select-sm max-w-xs"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                {Languages.map((language: languageSupport) => (
                                    <option
                                        key={language.value}
                                        value={language.value}
                                    >
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
                                {Themes.map((theme: themeStyle) => (
                                    <option
                                        key={theme.value}
                                        value={theme.value}
                                    >
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
                            <button onClick={() => setCode("")}>
                                <FaArrowRotateLeft />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="editorContainer">
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
                    />
                </div>
            </div>
        </div>
    );
}

export default Description;
