import { writable } from 'svelte/store';

const store_get = (store, key) => {
  if( typeof window !== 'undefined' ) {
    return window[store].getItem( key );
  }
}
const store_set = (store, key, value) => {
  if( typeof window !== 'undefined' ) {
    window[store].setItem( key, value );
  }
}

// Stores user's groceries data
const stored_budget = store_get( 'localStorage', 'budget' );
export const budget = writable( stored_budget && JSON.parse( stored_budget ) || [] );
budget.subscribe( value => store_set( 'localStorage', 'budget', JSON.stringify(value) ) );


// Stores user's budget data
const stored_groceries = store_get( 'localStorage', 'groceries' );
export const groceries = writable( stored_groceries && JSON.parse( stored_groceries ) || [] );
groceries.subscribe( value => store_set( 'localStorage', 'groceries', JSON.stringify(value) ) );
