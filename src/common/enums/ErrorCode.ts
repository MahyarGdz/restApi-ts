enum ErrorCode {
  // Authentication errors
  AUTH_USERNAME_NOT_FOUND = "ERR-AUTH-001",
  AUTH_INVALID_CREDENTIALS = "ERR-AUTH-002",
  AUTH_TOKEN_EXPIRED = "ERR-AUTH-003",
  // Input validation errors
  INPUT_VALIDATION_FAILED = "ERR-INPUT-001",
  // Specific API errors (consider adding more descriptive codes)
  BAD_REQUEST = "ERR-API-400",
  NOT_FOUND = "ERR-API-404",
  INTERNAL_SERVER_ERROR = "ERR-API-500",
  FORBIDDEN = "ERR-API-403",
  UNAUTHORIZED = "ERR-API-401",
}

export default ErrorCode;
