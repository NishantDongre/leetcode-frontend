import { DragEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

function Description({ descriptionText }: { descriptionText: string }) {
    const sanitizedMarkdown = descriptionText;

    const [activeTab, setActiveTab] = useState("statement");
    const [leftWidth, setLeftWidth] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

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
            className="flex w-screen h-screen"
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
                className="cursor-col-resize w-[5px] bg-slate-200 h-full flex flex-col justify-center"
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
            ></div>
        </div>
    );
}

export default Description;
