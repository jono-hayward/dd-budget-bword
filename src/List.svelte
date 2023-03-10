<script>

  import Edit from './Edit.svelte';
  import Item from './Item.svelte';

  import { groceries } from './stores.js';
  import { suggestions } from './suggestions.json';

  import { slide } from 'svelte/transition';

  import { format } from './helpers.js';

  const random_id = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

  let show_new_item = false;
  let new_item = {};

  const addItem = () => {
    new_item = {
      id: random_id(6),
      title: '',
      cost: 0.00,
      type: 'qty',
      unit_price: 0,
      qty: 1,
      weight_price: 0,
      weight_price_unit: 'kg',
      weight_amt: 0,
      weight_amt_unit: 'g'
    };

    show_new_item = true;
  }

  const save_new_item = e => {
    groceries.set( [...$groceries, e.detail.saved_item] );
    new_item = {};
  }


</script>

<style>

  ul {
    list-style: none;
    margin: 0; padding: 0;
  }
  li {
    background: var(--c-bg);
    border-bottom: 1px solid var(--c-border);
  }

  .add {
    display: block;
    width: 100%;
    font-size: 24px;
    background: none;
    border: none;
    font-weight: 200;
    line-height: 1;
    padding: calc(var(--gap) * 1.5) 0;
    margin: 0;
    color: var(--c-text);
  }

</style>

<ul>{#each $groceries as item, index (item.id)}
  <li transition:slide>
    <Item bind:item />
  </li>
{/each}</ul>
<button class="add" on:click={ addItem }>+</button>

<datalist id="suggestions">{#each suggestions as s}
  <option>{s}</option>
{/each}</datalist>

{#if show_new_item}<Edit bind:show={ show_new_item } item={ new_item } on:closed={ save_new_item } />{/if}
