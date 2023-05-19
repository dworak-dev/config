/**
 * @file sum.ts
 * @author dworac <mail@dworac.com>
 *
 * This is a simple function that adds two numbers.
 */

export interface ISum {
  a: number;
  b: number;
}

/**
 * Adds two numbers.
 *
 * @param {ISum} params - The parameters.
 * @returns {number} The sum of the two numbers.
 */
export const sum = (params: ISum) => params.a + params.b;
