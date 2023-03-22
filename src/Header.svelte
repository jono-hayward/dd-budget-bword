<script>

  import { browser } from '$app/environment';

  import { budget, groceries } from './stores.js';
  import { format } from './helpers';

  import Icon from './Icon.svelte';

  let menu_open = false;

  let installable = true;
  let prompt;
  let hide_prompt = false;

  const menu_toggle = () => {
    menu_open = !menu_open;
  }

  const reload = () => {
    menu_open = false;
    window.location.reload();
  }

  const clear_list = () => {
    menu_open = false;
    groceries.set([]);
  }

  const test_list = [
    {
      "id": "d2ae0c",
      "title": "Allspice",
      "cost": 0.48,
      "type": "amt",
      "unit_price": 24,
      "qty": 1,
      "weight_price": 24,
      "weight_price_unit": "kg",
      "weight_amt": "20",
      "weight_amt_unit": "g",
      "checked": false
    },
    {
      "id": "9aab23",
      "title": "Rice",
      "cost": 0,
      "type": "qty",
      "unit_price": 0,
      "qty": 1,
      "weight_price": 0,
      "weight_price_unit": "kg",
      "weight_amt": 0,
      "weight_amt_unit": "g",
      "checked": false
    },
    {
      "id": "9f325f",
      "title": "Baking paper",
      "cost": 12,
      "type": "qty",
      "unit_price": 12,
      "qty": 1,
      "weight_price": 0,
      "weight_price_unit": "kg",
      "weight_amt": 0,
      "weight_amt_unit": "g",
      "checked": true
    },
    {
      "id": "a2866e",
      "title": "Baking soda",
      "cost": 0,
      "type": "qty",
      "unit_price": 0,
      "qty": 1,
      "weight_price": 0,
      "weight_price_unit": "kg",
      "weight_amt": 0,
      "weight_amt_unit": "g",
      "checked": false
    },
    {
      "id": "a7fb92",
      "title": "American mustard",
      "cost": 0,
      "type": "qty",
      "unit_price": 0,
      "qty": 1,
      "weight_price": 0,
      "weight_price_unit": "kg",
      "weight_amt": 0,
      "weight_amt_unit": "g",
      "checked": false
    },
    {
      "id": "f47430",
      "title": "Sriracha sauce",
      "cost": 0,
      "type": "qty",
      "unit_price": 0,
      "qty": 1,
      "weight_price": 0,
      "weight_price_unit": "kg",
      "weight_amt": 0,
      "weight_amt_unit": "g",
      "checked": true
    },
    {
      "id": "bdc676",
      "title": "Thyme",
      "cost": 0,
      "type": "qty",
      "unit_price": 0,
      "qty": 1,
      "weight_price": 0,
      "weight_price_unit": "kg",
      "weight_amt": 0,
      "weight_amt_unit": "g",
      "checked": false
    },
    {
      "id": "47d35b",
      "title": "Lettuce",
      "cost": 0,
      "type": "qty",
      "unit_price": 0,
      "qty": 1,
      "weight_price": 0,
      "weight_price_unit": "kg",
      "weight_amt": 0,
      "weight_amt_unit": "g",
      "checked": false
    },
    {
      "id": "f07678",
      "title": "Crushed tomatoes",
      "cost": 1.6,
      "type": "qty",
      "unit_price": 0.80,
      "qty": 2,
      "weight_price": 0,
      "weight_price_unit": "kg",
      "weight_amt": 0,
      "weight_amt_unit": "g",
      "checked": false
    },
    {
      "id": "f33488",
      "title": "Cloves",
      "cost": 0,
      "type": "qty",
      "unit_price": 0,
      "qty": 1,
      "weight_price": 0,
      "weight_price_unit": "kg",
      "weight_amt": 0,
      "weight_amt_unit": "g",
      "checked": false
    },
    {
      "id": "f4eb17",
      "title": "Iced coffee",
      "cost": 0,
      "type": "qty",
      "unit_price": 0,
      "qty": 4,
      "weight_price": 0,
      "weight_price_unit": "kg",
      "weight_amt": 0,
      "weight_amt_unit": "g",
      "checked": false
    },
    {
      "id": "bad1df",
      "title": "Pringles",
      "cost": 5,
      "type": "qty",
      "unit_price": 5,
      "qty": 1,
      "weight_price": 0,
      "weight_price_unit": "kg",
      "weight_amt": 0,
      "weight_amt_unit": "g",
      "checked": false
    },
    {
      "id": "71efd1",
      "title": "Dish soap",
      "cost": 0,
      "type": "qty",
      "unit_price": 0,
      "qty": 1,
      "weight_price": 0,
      "weight_price_unit": "kg",
      "weight_amt": 0,
      "weight_amt_unit": "g",
      "checked": true
    },
    {
      "id": "fc209a",
      "title": "Milk",
      "cost": 0,
      "type": "qty",
      "unit_price": 0,
      "qty": 1,
      "weight_price": 0,
      "weight_price_unit": "kg",
      "weight_amt": 0,
      "weight_amt_unit": "g",
      "checked": false
    },
    {
      "id": "8cef19",
      "title": "Red pepper flakes",
      "cost": 0.24,
      "type": "amt",
      "unit_price": 0,
      "qty": 1,
      "weight_price": 12,
      "weight_price_unit": "kg",
      "weight_amt": 20,
      "weight_amt_unit": "g"
    }
  ];

  const add_sample_list = () => {
    menu_open = false;

    if ( window.confirm('Are you sure? This will overwrite your existing list') ) {
      groceries.set( [...test_list] );
    }
  }

  if ( browser ) {

    // Close menus when user clicks outside
    window.addEventListener( 'touchstart', e => {
      if ( !e.target.closest( 'nav' ) ) menu_open = false;
    } );

    window.addEventListener('DOMContentLoaded', function(){
       if (navigator.standalone || window.matchMedia('(display-mode: standalone)').matches || window.matchMedia('(display-mode: fullscreen)').matches || window.matchMedia('(display-mode: minimal-ui)').matches) {
          hide_prompt = true;
        }
        window.matchMedia('(display-mode: standalone)').addListener( e => {
          if ( e.matches ) { hide_prompt = true; }
        });
        window.matchMedia('(display-mode: fullscreen)').addListener( e => {
          if ( e.matches ) { hide_prompt = true; }
        });
        window.matchMedia('(display-mode: minimal-ui)').addListener( e => {
          if ( e.matches ) { hide_prompt = true; }
        });
    });

    window.addEventListener('beforeinstallprompt', e => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      alert( 'prompt!' );
      // Stash the event so it can be triggered later.
      prompt = e;
    });

    window.addEventListener('appinstalled', async () => {
       hide_prompt = true;
    });


    if ( !('serviceWorker' in navigator) ){
      installable = false;
    }

  }
</script>

<style>
  .header {
    background: var(--c-header-bg);
    padding: 6px var(--padding);
    padding-right: var(--spr);
    padding-left: var(--spl);
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
    border-bottom: .05em solid var(--c-header-bg);
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
    margin: 0;
    margin-right: calc( var(--gap) * -1 );
  }

  .menu {
    position: absolute;
    display: block;
    right: 7px;
    transform-origin: 88% -20%;
    z-index: 1;
    transition: opacity 250ms ease-out, transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1);
    list-style: none;
    margin: 0;
    padding: 0;
    filter: drop-shadow( 0 0 8px rgba(0, 0, 0, .25) );
    border-radius: var(--gap);
    background: var(--c-page-bg);
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
    right: 20px;
    border-style: solid;
    border-width: 0 7px 6px 7px;
    border-color: transparent transparent var(--c-page-bg) transparent;
    z-index: 1;
  }

  .menu button {
    padding: calc(var(--gap) * 1.3) calc(var(--padding) * .8);
    color: var(--c-text);
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
    width: 100%;
  }

  .menu li + li {
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
  <h1>Budget <span>Buddy</span></h1>

  <nav>
    <button on:click={ menu_toggle } aria-label="Open menu">
      <Icon name="cog" width="20px" height="20px" />
    </button>
    <ul class="menu" hidden={!menu_open}>
      <li><button on:click={ reload }>
        <span>Refresh</span>
        <Icon name="refresh" />
      </button></li>
      {#if installable && !hide_prompt}<li><button on:click={() => prompt.prompt()}>
        <span>Install to home screen</span>
        <Icon name="add-to-home" />
      </button></li>{/if}
      <li><button on:click={ add_sample_list }>
        <span>Test with sample list</span>
        <Icon name="list" />
      </button>
      <li><button class="destructive" on:click={ clear_list }>
        <span>Clear list</span>
        <Icon name="clear" />
      </button></li>
    </ul>
  </nav>
</div>
