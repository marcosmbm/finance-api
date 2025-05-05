import type { UpdateTransactionUseCase } from "@/use-cases";
import type { Request } from "express";

import {
  defaultErrorResponse,
  okResponse,
  checkIfHasDisallowedFields,
  badRequestResponse,
  checkIfUuidIsValid,
  invalidUuidResponse,
  checkIfValueIsEmpty,
  invalidRequiredFieldsResponse,
  checkIfDateIsValid,
  invalidDateResponse,
  checkIfAmountIsCurrency,
  invalidAmountResponse,
  invalidParamsResponse,
  checkIfTransactionTypeIsValid,
  invalidTransactionTypeResponse,
} from "../helpers";

export class UpdateTransactionController {
  private updateTransactionUseCase: UpdateTransactionUseCase;

  constructor(updateTransactionUseCase: UpdateTransactionUseCase) {
    this.updateTransactionUseCase = updateTransactionUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const data = httpRequest.body;
      const id = httpRequest.params.id;

      if (!data) {
        return invalidParamsResponse();
      }

      const allowedFields = ["name", "date", "amount", "type"];

      const hasFieldNotAllowed = checkIfHasDisallowedFields(
        data,
        allowedFields,
      );

      if (hasFieldNotAllowed) {
        badRequestResponse("Some provided field not allowed");
      }

      const uuidIsValid = checkIfUuidIsValid(id);
      if (!uuidIsValid) {
        return invalidUuidResponse();
      }

      if (data.name !== undefined) {
        const nameIsEmpty = checkIfValueIsEmpty(data.name);
        if (nameIsEmpty) {
          return invalidRequiredFieldsResponse("name");
        }
      }

      let date = undefined;
      if (data.date !== undefined) {
        date = data.date.toString();
        const dateIsValid = checkIfDateIsValid(date);
        if (!dateIsValid) {
          return invalidDateResponse();
        }
      }

      let amount = undefined;
      if (data.amount !== undefined) {
        amount = data.amount.toString();
        const amountIsValid = checkIfAmountIsCurrency(amount);
        if (!amountIsValid) {
          return invalidAmountResponse();
        }
      }

      let type = undefined;
      if (data.type !== undefined) {
        type = data.type.trim().toUpperCase();
        const typeIsValid = checkIfTransactionTypeIsValid(type);
        if (!typeIsValid) {
          return invalidTransactionTypeResponse();
        }
      }

      const transaction = await this.updateTransactionUseCase.execute({
        ...data,
        amount,
        type,
        date,
        id,
      });
      return okResponse(transaction);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
