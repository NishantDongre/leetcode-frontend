interface ErrorMessageProps {
  err: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ err }) => {
  console.log(err);
  return (
    <div className="max-w-sm mx-auto p-4 mt-8 bg-red-200 border-l-4 border-red-500 text-red-700 shadow-lg rounded-lg">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-red-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="font-semibold">Error</span>
      </div>
      <p className="mt-2 text-sm">
        Something went wrong, please try again later.
      </p>
    </div>
  );
};

export default ErrorMessage;
