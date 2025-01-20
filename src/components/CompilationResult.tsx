import React from "react";
import TimeLimitExceeded from "./TimeLimitExceeded";
import CompilationError from "./CompilationError";
import RuntimeError from "./RuntimeError";
import WrongAnswer from "./WrongAnswer";
import Accepted from "./Accepted";

import { CodeSubmissionResultType } from "../types/types";

interface CompilationResultProps {
  result: CodeSubmissionResultType;
  loading: boolean;
}

const CompilationResult: React.FC<CompilationResultProps> = ({
  result,
  loading,
}) => {
  const renderResult = () => {
    if (loading) {
      return (
        <div className="h-full flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      );
    } else if (result.isCE) {
      return <CompilationError result={result} />;
    } else if (result.isTLE) {
      // console.log("CR comp", result);
      return <TimeLimitExceeded result={result} />;
    } else if (result.isRE) {
      return <RuntimeError result={result} />;
    } else if (result.isWA) {
      return <WrongAnswer result={result} />;
    } else if (result.status === "ACCEPTED") {
      return <Accepted result={result} />;
    } else {
      return <div>Please Submitted the code to see the results</div>;
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden h-full px-3 py-2">
      <div className="flex-grow h-full overflow-y-auto">{renderResult()}</div>
    </div>
  );
};

export default CompilationResult;
