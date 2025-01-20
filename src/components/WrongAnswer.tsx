import React from "react";
import { CodeSubmissionResultType } from "../types/types";

interface CodeSubmissionResultTypeProps {
  result: CodeSubmissionResultType;
}

const WrongAnswer: React.FC<CodeSubmissionResultTypeProps> = ({ result }) => {
  const {
    totalTestCases,
    totalTestCasesPassed,
    input,
    output,
    expected,
    firstWA,
    isCustomTestCase,
  } = result;

  return (
    <div className="border border-red-800 rounded-lg p-5 shadow-lg">
      <h2 className="text-red-500">Wrong Answer</h2>
      {!isCustomTestCase && (
        <p className="text-xs mb-4">
          <span className="font-semibold text-red-500">
            {totalTestCasesPassed}
          </span>{" "}
          out of{" "}
          <span className="font-semibold text-red-500">{totalTestCases}</span>{" "}
          test cases passed
        </p>
      )}
      <h3 className="text-xl mt-2 mb-1 font-medium text-red-400">
        Last Executed Input
      </h3>
      {
        <ul>
          <li>
            <strong>Input:</strong> {input || firstWA?.input}
          </li>
          <li>
            <strong>Output:</strong> {output || firstWA?.output}
          </li>
          <li>
            <strong>Expected:</strong> {expected || firstWA?.expected}
          </li>
        </ul>
      }
    </div>
  );
};

export default WrongAnswer;
