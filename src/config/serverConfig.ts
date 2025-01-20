const serverConfig = {
  PROBLEM_SERVICE_HOSTNAME: import.meta.env.VITE_PROBLEM_SERVICE_HOSTNAME,
  SUBMISSION_SERVICE_HOSTNAME: import.meta.env.VITE_SUBMISSION_SERVICE_HOSTNAME,
  SOCKET_SERVICE_HOSTNAME: import.meta.env.VITE_SOCKET_SERVICE_HOSTNAME,
};
export default serverConfig;
