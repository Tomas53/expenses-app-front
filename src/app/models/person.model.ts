// src/app/models/person.model.ts
import {Expense} from "./expense.model";

export interface Person {
  id?: number;
  name: string;
  expenses?: Expense[];
}
