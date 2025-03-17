import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'people', pathMatch: 'full' },
  { path: 'people', component: PersonListComponent },
  { path: 'people/add', component: PersonFormComponent },
  { path: 'people/edit/:id', component: PersonFormComponent },
  { path: 'people/:id', component: PersonDetailComponent },
  { path: '**', redirectTo: 'people' } // Catch-all route for any undefined routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
