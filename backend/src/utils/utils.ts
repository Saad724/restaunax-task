type SendResponse<T> = {
  success: boolean;
  data: T | null;
  statusCode: number;
  message: string;
};

const sendResponse = <T>(
  success: boolean,
  data: T | null,
  statusCode: number,
  message: string,
): SendResponse<T> => {
  return {
    success,
    data,
    statusCode,
    message,
  };
};

const Utils = {
  sendResponse,
};

export default Utils;
