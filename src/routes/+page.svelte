<script>
  import Header from '../Header.svelte';
  import List from '../List.svelte';
  import Summary from '../Summary.svelte';
</script>

<style>
  main {
    flex: 1;
    overflow: auto;
    z-index: 0;
  }
</style>

<svelte:head>
  <title>BudgetBitch</title>
</svelte:head>

<header>
  <Header />
</header>

<main>
  <List />
</main>

<footer>
  <Summary />
</footer>
