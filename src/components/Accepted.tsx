import React from "react";
import { CodeSubmissionResultType } from "../types/types";

interface CodeSubmissionResultTypeProps {
  result: CodeSubmissionResultType;
}

const Accepted: React.FC<CodeSubmissionResultTypeProps> = ({ result }) => {
  const {
    totalTestCases,
    totalTestCasesPassed,
    input,
    output,
    expected,
    isCustomTestCase,
  } = result;

  return (
    <div className="border border-green-700 rounded-lg p-6 shadow-lg">
      <h2 className="text-green-500">Accepted</h2>
      {!isCustomTestCase && (
        <p className=" text-sm">
          <span className="font-semibold text-green-500">
            {totalTestCasesPassed}
          </span>{" "}
          out of{" "}
          <span className="font-semibold text-green-500">{totalTestCases}</span>{" "}
          test cases passed
        </p>
      )}
      <br />
      {isCustomTestCase && (
        <ul>
          <li>
            <strong>Input:</strong> {input}
          </li>
          <li>
            <strong>Output:</strong> {output}
          </li>
          <li>
            <strong>Expected:</strong> {expected}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Accepted;
