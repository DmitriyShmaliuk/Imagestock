<template>
    <div id="app">
        <header>
            <h1>Welcome to <span>imagestock</span></h1>
        </header>

        <main>
            <image-section v-for="(image,index) in images" :src="image.src" :style="image.style" :key="`image-${index}`"></image-section>
            <add-button @add-image="addImage"></add-button>
        </main>
    </div>
</template>

<script>
    import addButton from "./components/add-button";
    import imageSection from "./components/image-section";


    export default {
        name: 'app',
        data() {
            return {
                images: [],
                countImagesSection: 1,
            }
        },
        components: {
            "add-button": addButton,
            "image-section": imageSection
        },
        methods:{
            addImage(image){
                this.images.push({src: image, style: {}});

                if (this.countImagesSection >= 2 ){
                    let currentPosition = this.images.length - ((this.countImagesSection-1)*9);
                    
                    if (currentPosition === 1){
                        this.images[this.images.length-1].style = {
                            gridColumnStart: 5 * (this.countImagesSection - 1),
                            gridColumnEnd: 5 * (this.countImagesSection - 1) + 2,
                        }
                    }
                    else if (currentPosition === 5){
                        this.images[this.images.length-1].style = {
                            gridColumnStart: 6 * (this.countImagesSection - 1),
                            gridColumnEnd: 6 * (this.countImagesSection - 1) + 2,
                            gridRowStart: 3,
                            gridRowEnd: 4,
                        }
                    }

                    else if (currentPosition === 6){
                        this.images[this.images.length-1].style = {
                            gridColumnStart: 7 * (this.countImagesSection - 1),
                            gridColumnEnd: 7 * (this.countImagesSection - 1),
                            gridRowStart: 1,
                            gridRowEnd: 3,
                        }
                    }
                }

                if(this.images.length % 9 === 0){
                    ++this.countImagesSection;
                }
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

    main {
        display: grid;
        grid-template-columns: repeat(4, 236px);
        grid-template-rows: repeat(3, 200px);
        grid-auto-columns: 236px;
        grid-gap: 10px;
        grid-auto-flow: column;
        height: 697px;
        overflow: auto;

        .grid-section{
            position: relative;
            overflow: hidden;
            border-radius: 5px;
            background-size: cover !important;
            background-repeat: no-repeat !important;
            background-position: 50% 50% !important;
            background: #fff;
        }

        .image-section:nth-of-type(1){
            grid-column-start:1;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 2;
        }

        .image-section:nth-of-type(6){
            grid-column-start: 3;
            grid-column-end: 4;
            grid-row-end: 3;
            grid-row-start: 1;
        }

        .image-section:nth-of-type(5){
            grid-column-start: 2;
            grid-column-end: 4;
            grid-row-end: 3;
            grid-row-start: 4;
        }
    }
</style>

<style>
    @import "main.css";
</style>
