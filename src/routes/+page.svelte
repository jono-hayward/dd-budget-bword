<script>
  import Header from '../Header.svelte';
  import List from '../List.svelte';
  import Summary from '../Summary.svelte';
  import Prompt from '../Prompt.svelte';

  let list;
</script>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 2;
  }
</style>

<svelte:head>
  <title>BudgetBuddy</title>
</svelte:head>

<header>
  <Header />
</header>

<main>
  <List bind:this={list} />
  <Summary list={list} />
</main>

<Prompt />
