import currency from 'currency.js';

export const format = input => currency(input);

export const highlight = e => {
  e.target.type = 'tel';
  e.target.select();
  e.target.type = 'number';
}
