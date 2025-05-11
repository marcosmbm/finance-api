import validator from "validator";

export function checkIfPasswordIsValid(password: string) {
  return validator.isStrongPassword(password, {
    minLength: 6,
    minNumbers: 0,
    minSymbols: 0,
    minLowercase: 0,
    minUppercase: 0,
  });
}

export function checkIfAmountIsCurrency(amount: string) {
  if (Number(amount) <= 0) {
    return false;
  }

  return validator.isCurrency(amount, {
    digits_after_decimal: [2],
    allow_decimal: true,
    decimal_separator: ".",
  });
}

export function checkIfDateIsValid(date: string) {
  return validator.isDate(date, {
    format: "YYYY-MM-DD",
  });
}
