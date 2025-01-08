import { fetchHolidays } from "./lib/holidays";
import { calculateMonthlySalaries } from "./lib/calculate";
import { prompt } from "./lib/prompts";

const main = async () => {
  console.log("Welcome to the Salary Calculator CLI!");

  const hourlyRate = parseFloat(await prompt("Enter your hourly rate: "));
  const hoursPerDay = parseInt(await prompt("Enter your working hours per day: "), 10);
  const countryCode = (await prompt("Enter your country code (e.g., US, DO): ")).toUpperCase();

  console.log("Fetching holidays...");
  const holidays = await fetchHolidays(countryCode, 2025);

  console.log(`Holidays fetched (${holidays.length}):`);
  console.log(holidays);

  const { monthlySalaries, yearlySalary, sixMonthSalary } = calculateMonthlySalaries(
    2025,
    hourlyRate,
    hoursPerDay,
    holidays
  );

  console.table(monthlySalaries);
  console.log("First 6-month salary: ", sixMonthSalary.toFixed(2));
  console.log("Yearly salary: ", yearlySalary.toFixed(2));
};

main().catch((error) => console.error("Error:", error.message));
