// person-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../../models/person.model';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  people: Person[] = [];
  loading = true;
  error = '';

  constructor(
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.loading = true;
    this.personService.getAll().subscribe({
      next: (data) => {
        this.people = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading people: ' + err.message;
        this.loading = false;
      }
    });
  }

  editPerson(id: number): void {
    this.router.navigate(['/people/edit', id]);
  }

  viewPerson(id: number): void {
    this.router.navigate(['/people', id]);
  }

  deletePerson(id: number): void {
    if (confirm('Are you sure you want to delete this person?')) {
      this.personService.delete(id).subscribe({
        next: () => {
          this.loadPeople();
        },
        error: (err) => {
          this.error = 'Error deleting person: ' + err.message;
        }
      });
    }
  }
}
