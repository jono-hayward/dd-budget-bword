<script>

  import { createEventDispatcher } from 'svelte';

  import { format, highlight } from './helpers.js';

  export let show;
  export let item;
  let dialog, form;
  let is_open = false;

  $: if (dialog && show) show_modal();

  let temp_item = { ...item };

  const dispatch = createEventDispatcher();

  $: if ( temp_item.type === 'qty' ) {
    temp_item.cost = format( temp_item.unit_price * temp_item.qty );
  } else if ( temp_item.type === 'amt' ) {
    let weight_price_abs = temp_item.weight_price_unit === 'kg' ? temp_item.weight_price / 1000 : temp_item.weight_price;
    let weight_amt_abs = temp_item.weight_amt_unit === 'kg' ? temp_item.weight_amt * 1000 : temp_item.weight_amt;
    temp_item.cost = format( weight_price_abs * weight_amt_abs );
  }

  const show_modal = () => {
    dialog.showModal();
    setTimeout( () => is_open = true, 1 );
  }

  const close = save => {
    // Add a class that triggers the animation...
    is_open = false;
    if ( save ) {
      dispatch( 'closed', { saved_item: temp_item } );
    } else {
      temp_item = { ...item };
    }

    form.addEventListener( 'transitionend', () => {
      // ...then actually closes the dialog once the animation completes
      dialog.close();
    }, { once: true } );
  }

</script>

<style>

  dialog {
    background: none;
    border: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  dialog::backdrop {
    background: linear-gradient( to bottom, transparent 0px, transparent 60px, rgba(0, 0, 0, .45) 60px );
    opacity: 0;
    transition: opacity 250ms ease-out;
  }

  dialog.open::backdrop {
    opacity: 1;
  }

  form {
    position: fixed;
    bottom: 0; left: 0;
    width: 100%;
    border: none;
    padding: 0;
    opacity: 0;
    transition: all 250ms ease-out;
    transform: translateY(200px);
    -webkit-tap-highlight-color: rgba(0, 0, 0, .15);
  }

  dialog.open form {
    opacity: 1;
    transform: none;
  }

  fieldset {
    border-radius: calc( var(--gap) * 1.5 ) calc( var(--gap) * 1.5 ) 0 0;
    box-shadow: 0 0 24px rgba(0, 0, 0, .25);
    background: var(--c-page-bg);
    margin: 0;
    padding: calc( var(--gap) * 1.5 ) calc( var(--padding) - (var(--gap) * .5) ) calc( env(safe-area-inset-bottom) + var(--padding) );
    border: none;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    font-size: 24px;
    align-items: center;
  }

  input {
    color: var(--c-text);
    background: none;
    margin: 0;
    border: 1px solid var(--c-border);
    width: 100%;
    padding: calc( var(--gap) / 2 ) var(--gap);
    border-radius: 3px;
    font-size: 24px;
    font-weight: 200;
    outline: none;
    transition: border 250ms ease-in-out;
  }
  input:focus {
    border-color: var(--c-brand2);
  }

  input::-webkit-calendar-picker-indicator, input::-webkit-list-button {
    display: none;
  }


  label {
    margin-bottom: .25em;
    display: block;
  }

  .form_item {
    flex: 1 1 auto;
    /* margin: 0 calc(var(--gap) * -1); */
    margin: var(--gap) 0;
    padding: 0 calc( var(--gap) * .5 );
    color: var(--c-text);
  }

  .form_item.final {
    text-align: right;
    font-size: 30px;
    font-weight: 200;
  }


  .input_group {
    border: 1px solid var(--c-border);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border-radius: 3px;
    transition: border 250ms ease-in-out;
    align-items: stretch;
  }
  .input_group:focus-within, .input_group:focus-within input, .input_group:focus-within button {
    border-color: var(--c-brand2);
  }
  .input_group input, .input_group button {
    border: 1px solid var(--c-border);
    transition: border 250ms ease-in-out;
    border-width: 0 0 0 1px;
    border-radius: 0;
  }
  .input_group input:first-child, .input_group button:first-child {
    border: none;
  }
  .input_group button + input {
    text-align: center;
  }
  .input_group button {
    margin: 0;
    padding: 0 calc( var(--padding) * .75 );
    background: none;
    font-size: 24px;
    flex: 0 0 auto;
    line-height: 1;
    color: var(--c-text);
    font-weight: 200;
  }
  .input_group button:disabled {
    opacity: .5;
  }
  .input_group .cur {
    margin-left: var(--gap);
    padding: calc( var(--gap) / 2 ) 0;
  }
  .input_group .cur + * {
    border-left: 0;
  }
  .input_group .cur + input {
    padding-left: 0;
  }

  button.naked {
    border: 0;
    background: none;
    padding: 0;
    font-size: 14px;
    text-decoration: underline;
    opacity: .5;
    color: var(--c-text);
    font-weight: 600;
    display: block;
    margin-top: calc( -1 * var(--gap) );
  }

  button.action {
    display: block;
    background: var(--c-text);
    color: var(--c-page-bg);
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    width: 100%;
    border-radius: 4px;
    padding: var(--gap) var(--gap) calc( var(--gap) * 1.2 );
    border: none;
  }

</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  class:open={ is_open }
  bind:this={ dialog }
  on:close={() => (show = false)}
  on:click|self={() => close( false ) }
  >

  <form
    on:click|stopPropagation
    on:submit|preventDefault
    novalidate
    bind:this={ form }
    >
    <fieldset>

      <div class="form_item" style="flex-basis: 100%">
        <label for="title"><h5>Item</h5></label>
        <input type="text" name="title" id="title" list="suggestions" bind:value={ temp_item.title }>
      </div>

      {#if temp_item.type === 'qty'}
      <!-- Unit pricing -->
      <div class="form_item" style="flex-basis: 55%">
        <label for="price"><h5>Price</h5></label>
        <div class="input_group">
          <span class="cur">$</span>
          <input
            type="number"
            inputmode="decimal"
            name="unit_price"
            id="price"
            bind:value={ temp_item.unit_price }
            on:focus={ highlight }
            on:blur={ e => temp_item.unit_price = format(e.target.value) }
          >
        </div>
      </div>
      <div class="form_item" style="flex-basis: 45%">
        <label for="qty"><h5>Qty</h5></label>
        <div class="input_group">
          <button on:click={() => temp_item.qty -= 1} disabled={ temp_item.qty <= 1 }>-</button>
          <input type="number" inputmode="numeric" name="qty" id="qty" bind:value={ temp_item.qty }>
          <button on:click={() => temp_item.qty += 1}>+</button>
        </div>
      </div>
      <div class="form_item" style="flex-basis: 100%">
        <button class="naked" on:click={() => { temp_item.type = 'amt' }}>Price by weight</button>
      </div>
      {/if}

      {#if temp_item.type === 'amt'}
      <!-- Weight pricing -->
      <div class="form_item" style="flex-basis: 55%">
        <label for="weight_price"><h5>Price</h5></label>
        <div class="input_group">
          <span class="cur">$</span>
          <input type="number"
            inputmode="decimal"
            name="weight_price"
            id="weight_price"
            bind:value={ temp_item.weight_price }
            on:focus={ highlight }
            on:blur={ e => temp_item.weight_price = format(e.target.value) }
          >
          {#if temp_item.weight_price_unit === 'kg'}
            <button on:click={() => temp_item.weight_price_unit = 'g'}>/kg</button>
          {:else}
            <button on:click={() => temp_item.weight_price_unit = 'kg'}>/g</button>
          {/if}
        </div>
      </div>
      <div class="form_item" style="flex-basis: 45%">
        <label for="weight_amt"><h5>Amt</h5></label>
        <div class="input_group">
          <input type="number"
            inputmode="decimal"
            name="weight_amt"
            id="weight_amt"
            bind:value={ temp_item.weight_amt }
            on:focus={ highlight }
            on:blur={ e => temp_item.weight_amt = e.target.value }
          >
          {#if temp_item.weight_amt_unit === 'kg'}
            <button on:click={() => temp_item.weight_amt_unit = 'g'}>kg</button>
          {:else}
            <button on:click={() => temp_item.weight_amt_unit = 'kg'}>g</button>
          {/if}
        </div>
      </div>
      <div class="form_item" style="flex-basis: 100%">
        <button class="naked" on:click={() => { temp_item.type = 'qty' }}>Price by quantity</button>
      </div>
      {/if}

      <!-- Summary -->
      <div class="form_item" style="flex-basis: 50%">
        <button class="action" on:click={ () => close( true ) }>Save</button>
      </div>
      <div class="form_item final" style="flex-basis: 50%">
        <h5>Total</h5>
        <span class="cur">$</span><span>{ temp_item.cost }</span>
      </div>

    </fieldset>
  </form>
</dialog>
