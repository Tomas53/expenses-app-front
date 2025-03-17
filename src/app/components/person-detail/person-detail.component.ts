// person-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../models/person.model';
import { Expense } from '../../models/expense.model';
import { PersonService } from '../../services/person.service';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  person?: Person;
  expenses: Expense[] = [];
  loading = true;
  error = '';

  // For adding new expenses
  newExpense: Expense = { description: '', amount: 0 };

  constructor(
    private personService: PersonService,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadPerson(+id);
      this.loadExpenses(+id);
    } else {
      this.error = 'No person ID provided';
      this.loading = false;
    }
  }

  loadPerson(id: number): void {
    this.loading = true;
    this.personService.getById(id).subscribe({
      next: (data) => {
        this.person = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading person: ' + err.message;
        this.loading = false;
      }
    });
  }

  loadExpenses(personId: number): void {
    this.expenseService.getExpensesByPersonId(personId).subscribe({
      next: (data) => {
        this.expenses = data;
      },
      error: (err) => {
        this.error = 'Error loading expenses: ' + err.message;
      }
    });
  }

  addExpense(): void {
    if (this.person?.id && this.newExpense.description && this.newExpense.amount) {
      this.expenseService.create(this.newExpense, this.person.id).subscribe({
        next: (data) => {
          this.expenses.push(data);
          // Reset the form
          this.newExpense = { description: '', amount: 0 };
        },
        error: (err) => {
          this.error = 'Error adding expense: ' + err.message;
        }
      });
    }
  }

  deleteExpense(id: number): void {
    if (!id) return;

    this.expenseService.delete(id).subscribe({
      next: () => {
        this.expenses = this.expenses.filter(e => e.id !== id);
      },
      error: (err) => {
        this.error = 'Error deleting expense: ' + err.message;
      }
    });
  }

  editPerson(): void {
    if (this.person?.id) {
      this.router.navigate(['/people/edit', this.person.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/people']);
  }

  getTotalExpenses(): number {
    if (!this.expenses || this.expenses.length === 0) {
      return 0;
    }

    return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }
}
