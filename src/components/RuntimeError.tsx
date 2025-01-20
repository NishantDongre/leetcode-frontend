import React from "react";
import { CodeSubmissionResultType } from "../types/types";

interface CodeSubmissionResultTypeProps {
  result: CodeSubmissionResultType;
}

const RuntimeError: React.FC<CodeSubmissionResultTypeProps> = ({ result }) => {
  const {
    input,
    firstRE,
    isCustomTestCase,
    totalTestCases,
    totalTestCasesPassed,
  } = result;

  return (
    <div className="border border-red-800 rounded-lg p-5 shadow-lg">
      <h2 className="text-red-500">Runtime Error</h2>
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
        <>
          <ul>
            <li>
              <strong>Input: </strong> {input || firstRE?.input}
            </li>
            <li>
              <strong>Error:</strong>
            </li>
            <p className="border border-red-700 bg-grey-400 text-red-500 p-4 rounded mt-1">
              {firstRE?.output}
            </p>
          </ul>
        </>
      }
    </div>
  );
};

export default RuntimeError;
