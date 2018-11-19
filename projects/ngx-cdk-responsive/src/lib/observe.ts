export namespace Observe {
  export const ORIENTATION = '(orientation:landscape)';
  export const MAX_WIDTH = (value: number, unit: string = 'px') => `(max-width: ${value}${unit})`;
  export const MIN_WIDTH = (value: number, unit: string = 'px') => `(min-width: ${value}${unit})`;
  export const ANY_WINDOW_CHANGE = ['(max-width: 599.99px)', '(max-width: 959.99px)', '(max-width: 1279.99px)', '(max-width: 1919.99px)'];
}
