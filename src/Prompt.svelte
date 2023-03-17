<script>

  import { prefs } from './stores';

  let step = 1;

  const hide_prompt = () => {
    $prefs.hide_prompt = true;
  }

</script>

<style>

  aside {
    position: fixed;
    bottom: calc(env(safe-area-inset-bottom) + var(--padding));
    left: var(--padding);
    right: var(--padding);
    border-radius: var(--padding);
    padding: var(--padding);
    background: var(--c-page-bg);
    box-shadow: 0 0 0 2px var(--c-border), 0 8px 24px rgba(0, 0, 0, .25);
    z-index: 1;
  }

  aside::before, aside::after {
    content: ' ';
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%,50%) rotate(-45deg);
    background: inherit;
    width: 1em;
    height: 1em;
  }

  aside::before {
    bottom: -3px;
    background: var(--c-border);
  }

  h3 {
    text-transform: uppercase;
    font-weight: 800;
  }
  p {
    margin: .5em 0 1.5em;
  }

  h3 .a {
    margin-left: -.07em;
  }

  button {
    display: block;
    width: 100%;
    margin: var(--gap) 0;
    padding: calc(var(--gap) * 1.5);
    border-radius: 3px;
    color: var(--c-page-bg);
    border: none;
    background: var(--c-text);
    font-size: .8em;
    font-weight: 800;
    text-transform: uppercase;
  }

  button.secondary {
    background: none;
    border: 1px solid var(--c-text);
    color: var(--c-text);
  }

</style>

{#if $prefs && !$prefs.hide_prompt}<aside>
  {#if step === 1}
    <h3>Inst<span class="a">a</span>ll me plz?</h3>
    <p>This app works much better if you install it to your home screen so you can get to it with one tap. Wanna do that?</p>
    <button>Install</button>
    <button class="secondary" on:click={ hide_prompt }>No thanks</button>
  {/if}
</aside>{/if}
