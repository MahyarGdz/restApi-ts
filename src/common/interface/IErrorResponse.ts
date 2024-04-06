import { ErrorCode } from "../enums";

interface IErrorResponse {
  status: number;
  success: boolean;
  error: {
    errorCode: ErrorCode;
    message: string;
    details: string[];
  };
}
export default IErrorResponse;
