import { useState, useEffect } from "react";
import { Github, Code } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [text, setText] = useState("");
  const codeSnippet =
    '// Welcome to CodeQuest 🚀\nconst codeQuest = {\n  vision: "Build problem-solvers of tomorrow",\n  offerings: ["Challenging Problems", "Real-Time Feedback", \n"Test Case Evaluation", "Detailed Explanations"],\n  audienceIdealFor: "Everyone who loves coding",\n  tagline: "Think it. Code it. Optimize it."\n};\n\nconsole.log("Solve. Learn. Grow. 💡");';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= codeSnippet.length) {
        setText(codeSnippet.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-zinc-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-zinc-700 p-4 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <a
            href="https://github.com/NishantDongre"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors pr-2"
          >
            <Github size={20} />
          </a>
        </div>

        <div className="p-6">
          <div className="relative min-h-[300px] bg-zinc-900 rounded-lg p-6">
            <div className="space-y-4">
              <SyntaxHighlighter
                language="javascript"
                style={darcula}
                customStyle={{
                  background: "transparent",
                  padding: "0",
                  margin: "0",
                  fontSize: "1rem",
                }}
              >
                {text}
              </SyntaxHighlighter>
            </div>
          </div>

          <div className="mt-6 flex justify-end items-center">
            <Link
              to="/problems/list"
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 
                       transition-colors rounded-lg text-white font-medium"
            >
              <Code size={20} />
              <span>Solve Problems</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
