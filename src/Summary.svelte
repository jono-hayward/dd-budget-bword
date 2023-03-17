<script>

  import { groceries, budget } from './stores.js';
  import { format, highlight } from './helpers.js';

  import Icon from './Icon.svelte';

  export let list;

  import currency from 'currency.js';

  let sum = 0;
  let remaining;

  $budget = format($budget) || 0.00

  let budget_input = $budget || 0.00;

  $: $budget = format(budget_input);

  $: sum = $groceries.reduce( (acc, curr) => currency(acc).add(curr.cost), 0 );
  $: remaining = format($budget - sum);

  const set_budget = () => {
    budget_input = $budget;
  }
</script>

<style>
  div {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--gap) var(--spr) max(env(safe-area-inset-bottom), var(--gap)) var(--spl);

    z-index: 1;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    background: var(--c-shade);
    -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);

    color: var(--c-page-bg);
  }

  @media (prefers-color-scheme: dark) {
    div {
      color: var(--c-text);
    }
  }

  h5 {
    font-size: 12px;
  }

  aside {
    font-size: 20px;
    font-weight: 700;
    flex: 1 0 40%;
  }

  input {
    background: none;
    margin: 0; padding: 0;
    border: none;
    color: inherit;
    width: 4em;
    outline: none;
    border-radius: 0;
  }

  .remaining {
    text-align: right;
  }

  .add {
    flex: 0 0 50px;
  }
  .add button {
    background: none;
    border: 1px solid currentColor;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    color: currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }


  .warning {
    animation: 1s ease-out infinite alternate warning;
  }

  @keyframes warning {
    from {
      background: rgba(0, 0, 0, .65);
    }
    to {
      background: var(--c-cancel);
    }
  }
</style>

<div class:warning={remaining < 0}>
  <aside class="budget">
    <label for="budegt"><h5>Budget</h5></label>
    <span class="cur">$</span>
    <input
      type="number"
      id="budget"
      inputmode="decimal"
      bind:value={budget_input}
      placeholder="0.00"
      on:blur={ set_budget }
      on:focus={ highlight }
    >
  </aside>
  <aside class="add">
    <button on:click={ list.addItem }>
      <Icon name="add-item" width="20" height="20" />
    </button>
  </aside>
  <aside class="remaining">
    <h5>Remaining</h5>
    <span class="cur">$</span>
    <span>{remaining}</span>
  </aside>
</div>
