# ExpensesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



```markdown
# Expenses App

A full-featured expense tracking application built with Angular. This application allows users to manage people and their associated expenses, providing a simple and intuitive interface for expense tracking.

## Features

- **Person Management**: Add, edit, and delete people
- **Expense Tracking**: Add and delete expenses for each person
- **Expense Summaries**: Automatically calculate total expenses for each person
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: Angular 15.2.11
- **Styling**: Bootstrap (for responsive UI components)
- **HTTP Communication**: Angular HttpClient
- **Forms**: Both template-driven forms and reactive forms
- **Routing**: Angular Router for navigation

## Project Structure

- **Components**:
  - `PersonListComponent`: Displays a list of all people
  - `PersonFormComponent`: Form for adding/editing people
  - `PersonDetailComponent`: Shows person details and their expenses
  
- **Models**:
  - `Person`: Represents a person with ID, name, and expenses
  - `Expense`: Represents an expense with ID, description, and amount
  
- **Services**:
  - `PersonService`: Handles API operations for people
  - `ExpenseService`: Handles API operations for expenses

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd expenses-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   ng serve
   ```

4. Navigate to `http://localhost:4200/` in your browser

### Backend Configuration

This application requires a backend API. The API URL can be configured in:
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

The default API URL is `http://localhost:8080/api`.

## API Endpoints

The application expects the following API endpoints to be available:

- **People**:
  - `GET /api/people`: Retrieve all people
  - `GET /api/people/:id`: Retrieve a specific person by ID
  - `POST /api/people`: Add a new person
  - `PUT /api/people/:id`: Update a person
  - `DELETE /api/people/:id`: Delete a person

- **Expenses**:
  - `GET /api/expenses/person/:id`: Retrieve all expenses for a person
  - `GET /api/expenses/person/name/:name`: Retrieve all expenses for a person by name
  - `GET /api/expenses/:id`: Retrieve a specific expense by ID
  - `POST /api/expenses?personId=:personId`: Add a new expense for a person
  - `PUT /api/expenses/:id`: Update an expense
  - `DELETE /api/expenses/:id`: Delete an expense

## Building for Production

Run `ng build` to build the project for production. The build artifacts will be stored in the `dist/` directory.

## Running Tests

- Run `ng test` to execute unit tests via [Karma](https://karma-runner.github.io)
- Run `ng e2e` to execute end-to-end tests (requires additional configuration)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Angular team for the excellent framework
- Bootstrap for the UI components
```
