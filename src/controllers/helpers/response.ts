import { badRequestResponse } from "./http";

export function invalidPasswordResponse() {
  return badRequestResponse("Password must be at least 6 characters");
}

export function invalidEmailResponse() {
  return badRequestResponse("Email invalid. Please, provider a valid one");
}

export function invalidUuidResponse() {
  return badRequestResponse("Uuid invalid. Please, provider a valid one");
}

export function invalidParamsResponse() {
  return badRequestResponse("Params invalid");
}
