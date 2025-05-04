import type { CreateTransactionUseCase } from "@/use-cases";
import type { Request } from "express";

import {
  createdResponse,
  defaultErrorResponse,
  checkIfRequiredFieldsIsInvalid,
  invalidRequiredFieldsResponse,
  checkIfUuidIsValid,
  invalidUuidResponse,
  checkIfAmountIsCurrency,
  invalidAmountResponse,
  invalidTransactionTypeResponse,
  checkIfTransactionTypeIsValid,
  checkIfDateIsValid,
  invalidDateResponse,
  invalidParamsResponse,
} from "../helpers";

export class CreateTransactionController {
  private createTransactionUseCase: CreateTransactionUseCase;

  constructor(createTransactionUseCase: CreateTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const data = httpRequest.body;

      if (!data) {
        return invalidParamsResponse();
      }

      const fields = ["user_id", "amount", "name", "type", "date"];
      const requiredFieldsIsInvalid = checkIfRequiredFieldsIsInvalid(
        data,
        fields,
      );

      if (requiredFieldsIsInvalid) {
        return invalidRequiredFieldsResponse(requiredFieldsIsInvalid);
      }

      const userIdIsValid = checkIfUuidIsValid(data.user_id);

      if (!userIdIsValid) {
        return invalidUuidResponse();
      }

      const amount = data.amount.toString();
      const amountIsValid = checkIfAmountIsCurrency(amount);
      if (!amountIsValid) {
        return invalidAmountResponse();
      }

      const type = data.type.trim().toUpperCase();
      const transactionTypeIsValid = checkIfTransactionTypeIsValid(type);
      if (!transactionTypeIsValid) {
        return invalidTransactionTypeResponse();
      }

      const date = data.date.toString();
      const dateIsValid = checkIfDateIsValid(date);

      if (!dateIsValid) {
        return invalidDateResponse();
      }

      const transaction = await this.createTransactionUseCase.execute({
        ...data,
        amount,
        date,
      });
      return createdResponse(transaction);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
