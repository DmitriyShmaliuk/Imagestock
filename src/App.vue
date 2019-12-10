<template>
    <div id="app">
        <header>
            <h1>Welcome to <span>imagestock</span></h1>
        </header>

        <main>
            <image-section v-for="(src,index) in images" :src="src" :key="`image-${index}`"></image-section>
            <add-button></add-button>
        </main>
    </div>
</template>

<script>
    import addButton from "./components/add-button";
    import imageSection from "./components/image-section";
    import firstImage from "./assets/start-image1.jpg";
    import secondImage from "./assets/start-image2.jpg";
    import thirdImage from "./assets/start-image4.jpg";
    import fourthImage from "./assets/start-image4.jpg";
    import fifthImage from "./assets/start-image5.jpg";
    import sixthImage from "./assets/start-image6.jpg";
    import seventhImage from "./assets/start-image7.jpg";

    export default {
        name: 'app',
        data() {
            return {
                images: [firstImage, secondImage, thirdImage, fourthImage, fifthImage,
                    sixthImage,seventhImage],
            }
        },
        components: {
            "add-button": addButton,
            "image-section": imageSection
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
    }
</style>

<style>
    @import "main.css";
</style>
