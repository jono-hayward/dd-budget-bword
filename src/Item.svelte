<script>
  export let item;

  import { groceries } from './stores.js';

  import Edit from './Edit.svelte';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import { swipe } from 'svelte-gestures';
  import { slide } from 'svelte/transition';
  import { format } from './helpers.js';

  import Icon from './Icon.svelte';

  let edit_mode = false;

  let row;

  export const toggle = open => {
    // What state we want to set
    let state = typeof open !== 'undefined' ? open : !edit_mode;
    edit_mode = state;
  }

  const update_item = e => item = e.detail.saved_item;

  const delete_item = () => {
    const index = $groceries.findIndex( el => el.id === item.id );
    $groceries.splice(index, 1);
    groceries.set( $groceries );
  };

  item.unit_price = format( item.unit_price ) || 0;

</script>

<style>
  .item {
    display: flex;
    overflow: auto;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    background: var(--c-page-bg);
    --slide-button-width: 70px;
    position: relative;
  }
  .item::-webkit-scrollbar {
    display: none;
  }
  .row {
    /* position: relative; */
    padding-top: calc(var(--gap) * 1.5);
    padding-right: calc( env(safe-area-inset-right) + var(--padding) );
    padding-bottom: calc(var(--gap) * 1.5);
    padding-left: calc( env(safe-area-inset-left) + var(--padding) );
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    border: none;
    margin: 0;
    min-width: 100%;
    scroll-snap-align: start;
    color: var(--c-text);
    background: var(--c-bg);
  }
  /* Invisible element that gives us a scroll snap point */
  .row::after {
    content: ' ';
    position: absolute;
    left: var(--slide-button-width);
    top: 0;
    height: 100%;
    width: 100px;
    scroll-snap-align: start;
    pointer-events: none;
  }

  button.swipe.delete {
    padding: 0;
    background: var(--c-cancel);
    border: none;
    margin: 0;
    color: white;
    min-width: 100%;
    scroll-snap-align: start;
    text-align: right;
  }

  :global( button.swipe.delete svg ) {
    position: sticky;
    right: 25px;
    margin-left: 25px;
  }

  .amt {
    width: 3.2em;
    display: inline-block;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
</style>

<div class="item" bind:this={ row }>

  <button class="row" on:click={ () => toggle( true ) }>
    <aside>
      <span>{item.title}</span>
    </aside>
    <aside>
      <span class="cur">$</span><span class="amt">{ format( item.cost ) }</span>
    </aside>
  </button>

  <button class="swipe delete" on:click={ () => delete_item() }>
    <Icon name="delete" width="20" height="14" />
  </button>
</div>

{#if edit_mode}<Edit item={ item } bind:show={ edit_mode } on:closed={ update_item } />{/if}
