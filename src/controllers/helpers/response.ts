import { badRequestResponse } from "./http";

export function invalidParamsResponse() {
  return badRequestResponse("Params invalid");
}
