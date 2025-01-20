import React from "react";
import { CodeSubmissionResultType } from "../types/types";

interface CodeSubmissionResultTypeProps {
  result: CodeSubmissionResultType;
}

const CompilationError: React.FC<CodeSubmissionResultTypeProps> = ({
  result,
}) => {
  const { firstCE } = result;

  return (
    <div className="border border-red-800 rounded-lg p-5 shadow-lg">
      <h2 className="text-red-500">Compilation Error</h2>
      <br />
      {firstCE && (
        <>
          <ul>
            <li className="text-red-500">
              <strong>Error:</strong>{" "}
            </li>
          </ul>
          <p className="border border-red-700 bg-grey-400 text-red-500 p-4 mt-1 rounded">
            {firstCE?.output}
          </p>
        </>
      )}
    </div>
  );
};

export default CompilationError;
