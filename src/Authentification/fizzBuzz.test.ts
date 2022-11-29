import { describe, expect, it } from '@jest/globals';
import { fizzBuzz } from 'Authentification/fizzbuzz';

describe('Test FizzBuzz', () => {

  it('should return the number passed', () => {
    expect(fizzBuzz(1)).toEqual('1 ');
  });

  it('should return Fizz if the number passed is a multiple of 3', () => {
    expect(fizzBuzz(3)).toEqual('Fizz ');
  });

  it('should return Buzz if the number passed is a multple of 5', () => {
    expect(fizzBuzz(25)).toEqual('Buzz ');
  });

  it('should return FizzBuzz if the number passed is a multiple of 3 and 5', () => {
    expect(fizzBuzz(45)).toEqual('FizzBuzz ');
  });

  it('should return a new line if the number passed ends with a 9', () => {
    expect(fizzBuzz(19)).toEqual('19\n');

    expect(fizzBuzz(9)).toEqual('Fizz\n');
  });

});