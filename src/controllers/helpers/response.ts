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

export function invalidRequiredFieldsResponse(field: string) {
  return badRequestResponse(`Missing param: ${field}`);
}

export function invalidAmountResponse() {
  return badRequestResponse("The amount must be a valid currency");
}

export function invalidTransactionTypeResponse() {
  return badRequestResponse("Transaction type must be 'EARNING' or 'EXPENSE'");
}

export function invalidDateResponse() {
  return badRequestResponse(
    "Date invalid. Please, provider a valid date with the format (YYY-MM-DD).",
  );
}
