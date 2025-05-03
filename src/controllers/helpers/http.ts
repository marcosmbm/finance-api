import { EmailAlreadyInUseError, UserNotFoundError } from "@/errors";

function response<T = any>(statusCode: number, body: T) {
  return {
    statusCode,
    body,
  };
}

export function badRequestResponse(message: string) {
  return response(400, {
    message,
  });
}

export function notFoundResponse(message: string) {
  return response(404, {
    message,
  });
}

export function internalServerResponse() {
  return response(500, {
    message: "Internal server error",
  });
}

export function createdResponse<T = any>(body: T) {
  return response(201, body);
}

export function okResponse<T = any>(body: T) {
  return response(200, body);
}

export function defaultErrorResponse(error: unknown) {
  if (error instanceof EmailAlreadyInUseError) {
    return badRequestResponse(error.message);
  }

  if (error instanceof UserNotFoundError) {
    return notFoundResponse(error.message);
  }

  if (error instanceof Error) {
    return badRequestResponse(error.message);
  }

  return internalServerResponse();
}
