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

export function checkIfFieldsIsInvalid(data: any, fields: string[]) {
  for (const field of fields) {
    if (!data[field] || String(data[field]).trim() === "") {
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
