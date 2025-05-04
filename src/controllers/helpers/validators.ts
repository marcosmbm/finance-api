import validator from "validator";

export function checkIfUuidIsValid(id: string) {
  return validator.isUUID(id);
}

export function checkIfPasswordIsValid(password: string) {
  return validator.isStrongPassword(password, {
    minLength: 6,
    minNumbers: 0,
    minSymbols: 0,
    minLowercase: 0,
    minUppercase: 0,
  });
}

export function checkIfEmailIsValid(email: string) {
  return validator.isEmail(email);
}

export function checkIfRequiredFieldsIsInvalid(data: any, fields: string[]) {
  for (const field of fields) {
    if (data[field] === undefined) {
      return field;
    }

    if (String(data[field]).trim() === "") {
      return field;
    }
  }

  return null;
}

export function checkIfValueIsEmpty(value: string) {
  return validator.isEmpty(value);
}

export function checkIfHasDisallowedFields(data: any, fields: string[]) {
  const allowedField = fields;
  const someFieldsNotAllowed = Object.keys(data).some(
    (field) => !allowedField.includes(field),
  );

  return someFieldsNotAllowed;
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

export function checkIfTransactionTypeIsValid(type: string) {
  const types = ["EARNING", "EXPENSE"];

  return types.includes(type);
}

export function checkIfDateIsValid(date: string) {
  return validator.isDate(date, {
    format: "YYYY-MM-DD",
  });
}
