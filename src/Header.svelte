<script>

  import { groceries } from './stores.js';

  import { browser } from '$app/environment';

  import Icon from './Icon.svelte';
  import { scale } from 'svelte/transition';
  import { backOut } from 'svelte/easing';

  let menu_open = false;

  let menu_toggle = () => {
    menu_open = !menu_open;
  }

  let reload = () => {
    menu_open = false;
    window.location.reload();
  }

  let clear_list = () => {
    menu_open = false;
    groceries.set([]);
  }

  // Close menus when user clicks outside
  if ( browser ) {
    window.addEventListener( 'click', e => {
      if ( !e.target.closest( 'nav' ) ) menu_open = false;
    } );
  }
</script>

<style>
  .header {
    background: var(--c-brand);
    padding: var(--gap) var(--padding);
    padding-right: calc( env(safe-area-inset-right) + var(--padding) );
    padding-left: calc( env(safe-area-inset-left) + var(--padding) );
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    position: relative;
  }
  h1 {
    text-transform: uppercase;
    margin: 0;
    padding: 0;
    font-size: 24px;
    line-height: 1;
  }
  h1 span {
    font-weight: normal;
    text-decoration: strike;
    margin-left: -.15em;
    position: relative;
  }
  h1 span::after {
    content: ' ';
    height: 0;
    position: absolute;
    left: -5%;
    right: -5%;
    top: 50%;

    border-top: .05em solid var(--c-text);
    border-bottom: .05em solid var(--c-brand);
  }

  button {
    background: none;
    border: none;
    padding: var(--gap);
    display: flex;
    color: var(--c-text);
    margin: 0;
  }

  nav {
    position: relative;
    display: flex;
    flex-flow: column;
    margin: 0;
    margin-right: calc( var(--gap) * -1 );
  }

  .menu {
    position: absolute;
    right: -7px;
    top: 110%;
    border-radius: var(--gap);
    box-shadow: 0 4px 24px rgba(0, 0, 0, .45);
    min-width: 45vw;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    z-index: 0;
    padding: 0;
    transform-origin: 88% -20%;
    z-index: 10;

    border: 1px solid var(--c-border);
  }
  .menu::before {
    content: ' ';
    position: absolute;
    bottom: 100%;
    right: 19px;
    border-style: solid;
    border-width: 0 7px 6px 7px;
    border-color: transparent transparent var(--c-page-bg) transparent;
    z-index: -1;
  }
  .menu::after {
    content: ' ';
    position: absolute;
    bottom: calc(100% + 1px);
    right: 18.5px;
    border-style: solid;
    border-width: 0 7.5px 6.5px 7.5px;
    border-color: transparent transparent var(--c-border) transparent;
    z-index: -2;
  }
  .menu button {
    padding: calc(var(--gap) * 1.3) calc(var(--padding) * .8);
    color: var(--c-text);
    background: var(--c-page-bg);
    text-transform: uppercase;
    font-size: .8em;
    font-weight: 600;
    margin: 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    line-height: 1;
  }
  .menu button:first-child {
    border-radius: var(--gap) var(--gap) 0 0;
  }
  .menu button:last-child {
    border-radius: 0 0 var(--gap) var(--gap);
  }
  .menu button + button {
    border-top: 1px solid var(--c-border);
  }
  .menu button.destructive {
    color: var(--c-cancel);
  }
</style>

<div class="header">
  <h1>Budget <span>Bitch</span></h1>

  <nav>
    <button on:click={ menu_toggle } aria-label="Open menu">
      <Icon name="cog" width="20px" height="20px" />
    </button>
    {#if menu_open}<div class="menu" in:scale={{ start: .8, easing: backOut }} out:scale={{ start: .8 }}>
      <button on:click={ reload }>
        <span>Refresh</span>
        <Icon name="refresh" width="16px" height="16px" />
      </button>
      <button class="destructive" on:click={ clear_list }>
        <span>Clear list</span>
        <Icon name="clear" width="16px" height="16px" />
      </button>
    </div>{/if}
  </nav>
</div>
