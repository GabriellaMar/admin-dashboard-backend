type MessageList = {
    [key: number]: string;
  };


const messageList: MessageList = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
  };


  
  const HttpError = (status: number, message: string = messageList[status]): Error & { status: number } => {
    const error = new Error(message);
    (error as any).status = status; 
    return error  as Error & { status: number };
  };
  
  export default HttpError;