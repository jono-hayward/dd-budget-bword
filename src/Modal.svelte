<script>
  export let showModal;

  import { fly, fade } from 'svelte/transition';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let dialog;

  const close = () => {
    showModal = false;
    dispatch( 'closed' );
  }

</script>

<style>

  .dialog {
    z-index: 10;
  }
  .dialog, .backdrop {
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
  }

  .content {
    position: fixed;
    bottom: 0; left: 0;
    width: 100%;
    box-shadow: 0 0 24px rgba(0, 0, 0, .25);
    z-index: 1;
    border: none;
    padding: 0;
  }

  .backdrop {
    z-index: 0;
    background: rgba(0, 0, 0, .65);
    -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
  }

</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if showModal}
  <div class="dialog" bind:this={ dialog }>
    <div class="content" transition:fly={{ y: 200 }}>
      <slot></slot>
    </div>
    <div class="backdrop" aria-hidden on:click={ close } transition:fade></div>
  </div>
{/if}
