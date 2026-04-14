# Playwright Framework

Playwright test automation framework with database-driven test data.

## Tools Needed
- Node.js (v18+)
- VS Code
- MySQL database access

## Installation

```bash
npm install
npx playwright install
```

## Environment Setup

Create a `.env` file in the root directory with your database credentials:

```env
DB_HOST=your-database-host
DB_PORT=3306
DB_NAME=your-database-name
DB_USER=your-username
DB_PASSWORD=your-password
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests with database login
```bash
npx playwright test tests/login.spec.ts --grep "database"
```

### Run specific test file
```bash
npx playwright test tests/login.spec.ts
```

### Run with UI mode
```bash
npx playwright test --ui
```

### View test report
```bash
npx playwright show-report
```

## Project Structure

```
├── src/
│   ├── data/
│   │   ├── testData.ts      # Static test data
│   │   └── dbLogin.ts       # Database connection helper
│   ├── fixtures/
│   │   └── customFixtures.ts
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── homePage.ts
│   │   └── loginPage.ts
│   └── utils/
├── tests/
│   └── login.spec.ts
├── .env                      # Database credentials (not committed)
└── playwright.config.ts
```

## Database Login

The framework supports reading login credentials from a MySQL database.

### Database Query
```sql
SELECT * FROM login WHERE id = 2
```

### Usage in Tests
```typescript
import { getLoginById } from '../src/data/dbLogin';

test('login with DB credentials', async ({ loginPage, homePage }) => {
  const creds = await getLoginById(2);
  await loginPage.login(creds.username, creds.password);
});
```