// src/app/services/expense.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = `${environment.apiUrl}/expenses`;

  constructor(private http: HttpClient) { }

  getExpensesByPersonId(personId: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/person/${personId}`);
  }

  getExpensesByPersonName(name: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/person/name/${name}`);
  }

  getById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`);
  }

  create(expense: Expense, personId: number): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}?personId=${personId}`, expense);
  }

  update(id: number, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
