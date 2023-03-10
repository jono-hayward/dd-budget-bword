<script>

  import { groceries, budget } from './stores.js';
  import { format, highlight } from './helpers.js';

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
    padding-top: var(--padding);
    padding-right: calc( env(safe-area-inset-right) + var(--padding) );
    padding-bottom: calc( env(safe-area-inset-bottom) + var(--padding) + var(--gap) );
    padding-left: calc( env(safe-area-inset-left) + var(--padding) );
    background: var(--c-brand2);

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    color: var(--c-page-bg);
  }

  aside {
    font-size: 36px;
    font-weight: 200;
  }

  .remaining {
    text-align: right;
  }

  input {
    background: none;
    margin: 0; padding: 0;
    border: none;
    color: inherit;
    width: 40vw;
    outline: none;
  }

  .warning {
    animation: 1s ease-out infinite alternate warning;
  }

  @keyframes warning {
    from {
      background: var(--c-brand2);
    }
    to {
      background: var(--c-cancel);
    }
  }
</style>

<div class:warning={remaining < 0}>
  <aside class="budget">
    <h5>Budget</h5>
    <span class="cur">$</span><input type="number" inputmode="decimal" bind:value={budget_input} placeholder="0.00" on:blur={ set_budget } on:focus={ highlight } >
  </aside>
  <aside class="remaining">
    <h5>Remaining</h5>
    <span class="cur">$</span><span>{remaining}</span>
  </aside>
</div>
