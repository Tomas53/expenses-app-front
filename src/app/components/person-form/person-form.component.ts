import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../models/person.model';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
  personForm!: FormGroup;
  editMode = false;
  personId?: number;
  loading = false;
  submitting = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.personId = +params['id'];
        this.loadPerson(this.personId);
      }
    });
  }

  initForm(): void {
    this.personForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      expenses: this.fb.array([])
    });
  }

  loadPerson(id: number): void {
    this.loading = true;
    this.personService.getById(id).subscribe({
      next: (person) => {
        // Clear existing expense form array
        while (this.expenses.length) {
          this.expenses.removeAt(0);
        }

        // Add person data to form
        this.personForm.patchValue({
          name: person.name
        });

        // Add expenses to form array
        if (person.expenses && person.expenses.length > 0) {
          person.expenses.forEach(expense => {
            this.expenses.push(
              this.fb.group({
                id: [expense.id],
                description: [expense.description, Validators.required],
                amount: [expense.amount, [Validators.required, Validators.min(0)]]
              })
            );
          });
        }

        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading person: ' + err.message;
        this.loading = false;
      }
    });
  }

  get expenses(): FormArray {
    return this.personForm.get('expenses') as FormArray;
  }

  addExpense(): void {
    this.expenses.push(
      this.fb.group({
        description: ['', Validators.required],
        amount: [0, [Validators.required, Validators.min(0)]]
      })
    );
  }

  removeExpense(index: number): void {
    this.expenses.removeAt(index);
  }

  onSubmit(): void {
    if (this.personForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      this.personForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const personData: Person = this.personForm.value;

    if (this.editMode && this.personId) {
      // Update existing person
      personData.id = this.personId;
      this.personService.update(this.personId, personData).subscribe({
        next: () => {
          this.router.navigate(['/people']);
        },
        error: (err) => {
          this.error = 'Error updating person: ' + err.message;
          this.submitting = false;
        }
      });
    } else {
      // Create new person
      this.personService.create(personData).subscribe({
        next: () => {
          this.router.navigate(['/people']);
        },
        error: (err) => {
          this.error = 'Error creating person: ' + err.message;
          this.submitting = false;
        }
      });
    }
  }
}
