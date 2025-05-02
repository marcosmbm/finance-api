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

export function internalServerResponse() {
  return response(500, {
    message: "Internal server error",
  });
}

export function createdResponse<T = any>(body: T) {
  return response(201, body);
}
