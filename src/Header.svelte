<script>

  import { groceries } from './stores.js';

  import { browser } from '$app/environment';

  import Icon from './Icon.svelte';
  import { scale } from 'svelte/transition';
  import { backOut } from 'svelte/easing';

  let menu_open = false;

  let installable = true;
  let prompt;
  let hide_prompt = false;

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

    window.addEventListener('DOMContentLoaded', function(){
       if (navigator.standalone || window.matchMedia('(display-mode: standalone)').matches || window.matchMedia('(display-mode: fullscreen)').matches || window.matchMedia('(display-mode: minimal-ui)').matches) {
         hide_prompt = true;
        }
    });

    window.addEventListener('beforeinstallprompt', e => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      prompt = e;
    });

    window.addEventListener('appinstalled', async function(e) {
       hide_prompt = true;
    });


    if (!('serviceWorker' in navigator)){
      installable = false;
    }

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
    text-align: left;
  }

  nav {
    position: relative;
    margin: 0;
    margin-right: calc( var(--gap) * -1 );
  }

  .menu {
    position: fixed;
    right: 7px;
    border-radius: var(--gap);
    box-shadow: 0 4px 24px rgba(0, 0, 0, .45);
    padding: 0;
    transform-origin: 88% -20%;
    display: flex;
    flex-flow: column;
    border: 1px solid var(--c-border);
    z-index: 1;
    transition: all 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .menu[hidden] {
    pointer-events: none;
    opacity: 0;
    transform: scale(.8);
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
    text-align: left;
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

  .menu button span {
    flex: 0 0 auto;
  }
  :global(.menu button svg) {
    flex: 0 0 18px;
    margin-left: var(--padding);
  }
</style>

<div class="header">
  <h1>Budget <span>Bitch</span></h1>

  <nav>
    <button on:click={ menu_toggle } aria-label="Open menu">
      <Icon name="cog" width="20px" height="20px" />
    </button>
    <div class="menu" hidden={!menu_open}>
      <button on:click={ reload }>
        <span>Refresh</span>
        <Icon name="refresh" />
      </button>
      {#if installable && !hide_prompt}<button on:click={() => prompt.prompt()}>
        <span>Install to home screen</span>
        <Icon name="add-to-home" />
      </button>{/if}
      <button class="destructive" on:click={ clear_list }>
        <span>Clear list</span>
        <Icon name="clear" />
      </button>
    </div>
  </nav>
</div>
