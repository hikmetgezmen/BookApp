class ApiError extends Error {
  constructor(message, status = 500, path = "/api") {
    super();
    this.message = message;
    this.path = path;
    this.status = status;
  }
}

export { ApiError };

export default ApiError;
