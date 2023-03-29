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
  .row {
    display: flex;
    overflow: auto;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    background: linear-gradient( to right, var(--c-bg) 50%, var(--c-cancel) 50% );
    position: relative;

    --row-height: 60px;
  }
  .row::-webkit-scrollbar {
    display: none;
  }

  .item {
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
    justify-content: space-between;
    min-width: 100vw;
    background: var(--c-bg);
    scroll-snap-align: start;
    height: var(--row-height);
  }

  .check {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex: 0 0 var(--row-height);
    margin-left: env(safe-area-inset-left);
  }

  .check input {
    appearance: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    height: 100%;
    width: 100%;
    background: none;
  }

  .check input::before {
    content: ' ';
    width: 20px;
    height: 20px;
    border: 2px solid var(--c-text);
    opacity: .25;
    border-radius: 50%;
    position: relative;
    flex: 0 0 20px;
  }

  .check input::after {
    content: ' ';
    width: 7px;
    height: 15px;
    background: transparent;
    position: absolute;
    top: 40%;
    left: 45%;
    box-shadow: 2px 2px 0 var(--c-text), -2px -2px 0 var(--c-bg) inset, 4px 4px 0 var(--c-bg);

    opacity: 0;
    transform: translate(-50%,-50%) rotate(40deg) scale(.8, .4);
    transform-origin: 90% 90%;

    transition: opacity 250ms ease-out, transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .check input:checked::after {
    opacity: 1;
    transform: translate(-50%,-50%) rotate(40deg);
  }

  .item-btn {
    /* position: relative; */
    padding: 0;
    padding-right: var(--spr);
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    border: none;
    margin: 0;
    color: var(--c-text);
    background: var(--c-bg);
    flex: 1;
  }

  .title {
    flex: 1;
    text-align: left;
  }

  .title small {
    opacity: .6;
    margin-left: var(--gap);
  }
  .checked .title span {
    opacity: .65;
    position: relative;
  }
  .checked .title span::after {
    position: absolute;
    content: ' ';
    left: -3px;
    right: -3px;
    top: 55%;
    height: 1px;
    background: var(--c-text);
    animation: strike 150ms ease-out;
    transform-origin: center left;
  }

  @keyframes strike {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }

  button.swipe.delete {
    padding: 0;
    background: var(--c-cancel);
    border: none;
    margin: 0;
    color: white;
    scroll-snap-align: start;
    text-align: right;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: var(--padding);
    padding-right: var(--spr);
  }

  .amt {
    width: 2.6em;
    display: inline-block;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
</style>

<div class="row" bind:this={ row }>

  <aside class="item" class:checked={ item.checked }>

    <div class="check">
      <input type="checkbox" bind:checked={ item.checked } />
    </div>

    <button class="item-btn" on:click={ () => toggle( true ) }>
      <aside class="title">
        <span>{item.title}</span>
        <small>
          {#if item.type === 'qty'}
            {#if item.qty > 1}
              x{item.qty}
            {/if}
          {:else}
            {item.weight_amt}{item.weight_amt_unit}
          {/if}
        </small>
      </aside>
      <aside>
        <span class="cur">$</span><span class="amt">{ format( item.cost ) }</span>
      </aside>
    </button>
  </aside>

  <button class="swipe delete" on:click={ () => delete_item() }>
    <Icon name="delete" width="20" height="14" />
  </button>
</div>

{#if edit_mode}<Edit item={ item } bind:show={ edit_mode } on:closed={ update_item } />{/if}
