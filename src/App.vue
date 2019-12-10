<template>
    <div id="app">
        <header>
            <h1>Welcome to <span>imagestock</span></h1>
        </header>

        <main>
            <section id="addBtn" class="grid-section">
                <figure>
                    <img :src="addButtonImage" alt="add button"/>
                    <figcaption>Add your Picture</figcaption>
                </figure>

                <input v-show="addBtnClick" type="file" name="userfile"/>
            </section>
        </main>
    </div>
</template>

<script>
    import addButtonImage from "./assets/add-btn.png";

    export default {
        name: 'app',
        data() {
            return {
                addButtonImage,
                addBtnClick: false,
            }
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

        #addBtn{
            figure{
                position: absolute;
                top: 50%;
                left: 50%;
                width: 72px;
                margin-top: -45px;
                margin-left: -36px;
                cursor: pointer;

                img{
                    display: block;
                    width: 52px;
                    margin: 0 auto;
                }

                figcaption{
                    width: 72px;
                    font-size: 14px;
                    font-weight: bold;
                    text-align: center;
                    color: #a0b0ba;
                }
            }
        }
    }
</style>

<style>
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
    }

    #app {
        width: 1024px;
        height: 768px;
        padding: 25px;
        background: #f0f3f6;
    }

    .grid-section{
        position: relative;
        overflow: hidden;
        border-radius: 5px;
        background-size: cover !important;
        background-repeat: no-repeat !important;
        background-position: 50% 50% !important;
        background: #fff;
    }
</style>
