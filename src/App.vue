<template>
    <div id="app">
        <header>
            <h1>Welcome to <span>imagestock</span></h1>
        </header>

        <main>
            <add-button></add-button>
        </main>
    </div>
</template>

<script>
    import AddButton from "./components/add-button";

    export default {
        name: 'app',
        components: {
            "add-button": AddButton
        }

    }
</script>

<style scope lang="scss">
    header {
        position: relative;
        z-index: 3;
        margin-bottom: 10px;

        h1 {
            font-size: 24px;
            font-weight: 900;
            text-transform: uppercase;
            color: #8499a7;

            span {
                color: #21b8c6;
            }
        }
    }

    main{
        display: grid;
        grid-template-columns: repeat(4, 236px);
        grid-template-rows: repeat(3, 200px);
        grid-auto-columns: 236px;
        grid-gap: 10px;
        grid-auto-flow: column;
        height: 697px;
    }
</style>

<style>
    @import "main.css";
</style>
