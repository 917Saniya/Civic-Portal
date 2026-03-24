export function getApiErrorMessage(error, fallback = "Something went wrong.") {
  if (!error.response) {
    return "Network issue. Please check if backend is running.";
  }

  const { status, data } = error.response;
  const backendMessage = data?.message || data?.error || data?.details;

  if (status === 401) {
    return "Unauthorized access (401). Please login again.";
  }
  if (status === 403) {
    return "Access denied for this operation.";
  }
  if (status === 400) {
    return backendMessage || "Invalid request. Please review your input.";
  }

  return backendMessage || fallback;
}
