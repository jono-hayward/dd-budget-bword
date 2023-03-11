<script>
    export let name;
    export let width = "18px";
    export let height = "18px";
    export let focusable = false;
</script>

<svg class={$$props.class} {focusable} {width} {height}>
    <use href={`/icons.svg#${name}`} />
</svg>
