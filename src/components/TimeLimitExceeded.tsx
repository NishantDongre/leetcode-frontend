import React from "react";
import { CodeSubmissionResultType } from "../types/types";

interface CodeSubmissionResultTypeProps {
  result: CodeSubmissionResultType;
}

const TimeLimitExceeded: React.FC<CodeSubmissionResultTypeProps> = ({
  result,
}) => {
  const {
    firstTLE,
    totalTestCases,
    totalTestCasesPassed,
    input,
    isCustomTestCase,
  } = result;

  return (
    <div className="border border-red-800 rounded-lg p-5 shadow-lg">
      <h2 className="text-red-500">Time Limit Exceeded</h2>
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
      {firstTLE && (
        <ul>
          <li>
            <strong>Input:</strong> {input || firstTLE.input}
          </li>
        </ul>
      )}
    </div>
  );
};

export default TimeLimitExceeded;
