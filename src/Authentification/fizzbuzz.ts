
export const fizzBuzz = (nb: number): string => {
  const endline = (nb + 1) % 10 === 0 ? '\n' : ' ';

  if (nb % 3 === 0 && nb % 5 === 0)
    return 'FizzBuzz' + endline;
  else if (nb % 3 === 0)
    return 'Fizz' + endline;
  else if (nb % 5 === 0)
    return 'Buzz' + endline;

  return nb + endline;
};