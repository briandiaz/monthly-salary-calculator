export const getWorkingDaysInMonth = (year: number, month: number, holidays: string[]): number => {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  let workingDays = 0;

  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    const day = date.getDay();
    const isHoliday = holidays.includes(date.toDateString());
    if (day !== 0 && day !== 6 && !isHoliday) {
      workingDays++;
    }
  }

  return workingDays;
};

export const calculateMonthlySalaries = (
  year: number,
  hourlyRate: number,
  hoursPerDay: number,
  holidays: string[]
) => {
  let yearlySalary = 0;
  let sixMonthSalary = 0;
  const monthlySalaries: { month: string; workingDays: number; monthlySalary: number }[] = [];

  for (let month = 0; month < 12; month++) {
    const workingDays = getWorkingDaysInMonth(year, month, holidays);
    const monthlySalary = workingDays * hoursPerDay * hourlyRate;
    yearlySalary += monthlySalary;
    if (month < 6) {
      sixMonthSalary += monthlySalary;
    }

    monthlySalaries.push({
      month: new Date(year, month).toLocaleString("default", { month: "long" }),
      workingDays,
      monthlySalary,
    });
  }

  return { monthlySalaries, yearlySalary, sixMonthSalary };
};
