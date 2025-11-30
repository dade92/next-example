# Testing Guide

This project uses Jest and React Testing Library for unit and component testing.

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- src/tests/pages/signup/index.test.tsx

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Test Structure

- **Unit Tests**: Located in `src/tests/` following the same directory structure as the source code
- **Component Tests**: React components are tested using React Testing Library with Material-UI theme provider
- **Mocking**: External dependencies are mocked using Jest mocks

## Test Setup

- **Jest Configuration**: `jest.config.js` - configured for TypeScript and React components
- **Setup File**: `src/tests/setupTests.ts` - includes `@testing-library/jest-dom` matchers
- **Environment**: Tests run in jsdom environment for DOM testing

## Writing Component Tests

When testing React components that use Material-UI:

```typescript
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const TestWrapper = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const renderWithTheme = (component) => {
    return render(component, { wrapper: TestWrapper });
};
```

## Example Test Patterns

- **Form Testing**: Test input changes, form submission, validation
- **API Mocking**: Mock fetch calls and API responses
- **Router Mocking**: Mock Next.js router for navigation testing
- **Loading States**: Test loading indicators and disabled states
- **Error Handling**: Test error display and form reset behavior
