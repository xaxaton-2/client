import { Student } from '@/types/students';

export const getFullName = (student: Student) => {
  return [student.surname, student.name, student.patronymic].filter(Boolean).join(' ');
};

export const getEnding = (count: number, labels: string[]) => {
  const lastNumber = count % 10;
  const lastTwoNumbers = count % 100;
  const [one, two, many] = labels;

  if (lastTwoNumbers > 10 && lastTwoNumbers < 20) {
    return `${count} ${many}`;
  } else if (lastNumber === 1) {
    return `${count} ${one}`;
  } else if (lastNumber > 1 && lastNumber < 5) {
    return `${count} ${two}`;
  }
  return `${count} ${many}`;
};
