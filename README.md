# Monthly Salary Calculator

A Node.js-based library and CLI tool to calculate monthly, six-month, and yearly salaries based on hourly rate, working hours per day, and public holidays.

---

## Features

- Fetches public holidays dynamically using the [Nager.Date API](https://date.nager.at/).
- Calculates working days in a month, excluding weekends and holidays.
- Computes monthly, first six-month, and yearly salaries.
- Simple CLI interface and reusable library functions.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/briandiaz/monthly-salary-calculator.git
cd monthly-salary-calculator
```

### Install Dependencies

```bash
npm install
```

### Build the Project

```bash
npm run build
```

---

## Usage

### As a CLI Tool

1. Build the project:
   ```bash
   npm run build
   ```
2. Start the CLI:
   ```bash
   npm start
   ```

The CLI will guide you through entering your **hourly rate**, **working hours per day**, and **country code** to fetch holidays. It will then display a breakdown of monthly salaries.

### As a Library

You can use the functions provided by the library programmatically in your project.

#### Example:

```typescript
const {
  fetchHolidays,
} = require("monthly-salary-calculator/dist/lib/holidays");
const {
  calculateMonthlySalaries,
} = require("monthly-salary-calculator/dist/lib/calculate");

(async () => {
  const holidays = await fetchHolidays("US", 2025); // Replace "US" with your country code
  const results = calculateMonthlySalaries(2025, 25, 8, holidays); // Hourly rate: $25, 8 hours/day
  console.table(results.monthlySalaries);
  console.log("First 6-month salary:", results.sixMonthSalary);
  console.log("Yearly salary:", results.yearlySalary);
})();
```

---

## Project Structure

```
monthly-salary-calculator/
├── src/
│   ├── cli.ts            # CLI implementation
│   ├── lib/
│   │   ├── holidays.ts   # Holiday fetching logic
│   │   ├── calculate.ts  # Salary calculation logic
│   │   └── prompts.ts    # CLI prompts
├── dist/                 # Compiled JavaScript files
├── scripts/              # Utility scripts (e.g., post-build fixes)
├── .gitignore            # Git ignore rules
├── package.json          # Project metadata and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Documentation
```

---

## Configuration

### TypeScript

The project uses TypeScript with the following settings:

- `target`: ES2020
- `module`: CommonJS
- `strict`: Enabled for robust type-checking

---

## Development

### Start Development Server

Run the TypeScript compiler in watch mode:

```bash
npm run dev
```

### Build for Production

Compile the TypeScript files:

```bash
npm run build
```

---

## API Reference

### `fetchHolidays(countryCode: string, year: number): Promise<string[]>`

Fetches an array of public holidays for the specified country and year.

- **Parameters:**

  - `countryCode`: ISO 3166-1 alpha-2 country code (e.g., "US" for United States).
  - `year`: Year to fetch holidays for (e.g., `2025`).

- **Returns:** `Promise<string[]>` – Array of holiday dates as strings.

---

### `calculateMonthlySalaries(year: number, hourlyRate: number, hoursPerDay: number, holidays: string[]): { monthlySalaries: Array<{ month: string, workingDays: number, monthlySalary: number }>, yearlySalary: number, sixMonthSalary: number }`

Calculates monthly, first six-month, and yearly salaries.

- **Parameters:**
  - `year`: Year to calculate salaries for (e.g., `2025`).
  - `hourlyRate`: Hourly rate in your currency.
  - `hoursPerDay`: Number of working hours per day.
  - `holidays`: Array of holidays to exclude from working days.

---

## Acknowledgements

- [Nager.Date API](https://date.nager.at/) for providing public holiday data.
- Node.js and TypeScript for powering this project.

#### Author: [Brian Díaz](mailto:brianediaz7@gmail.com)

Feel free to reach out for collaboration or questions!

---

## Contributions

Contributions are welcome! Feel free to fork this repository and submit a pull request with improvements.
