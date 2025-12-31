# Dummy Note

A personal application to manage notes, built with Angular. This project has been restructured for a cleaner, modern architecture.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Angular CLI](https://angular.io/cli) (optional, for development)

## Project Structure

- `src/`: Core application source code.
- `src/environments/`: Environment-specific configurations (e.g., Google Client ID).
- `angular.json`: Angular workspace configuration.
- `package.json`: Project dependencies and scripts.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/khanhnguyenhong/dummy-note.git
cd dummy-note
```

### 2. Environment Setup

Configure your Google Client ID in `src/environments/environment.ts` (and `environment.prod.ts` for production):

```typescript
export const environment = {
  production: false,
  clientId: 'YOUR_GOOGLE_CLIENT_ID_HERE'
};
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200`.

## Build

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.
