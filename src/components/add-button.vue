<template>
    <section id="addBtn" class="grid-section">
        <figure>
            <img :src="addButtonImage" alt="add button"/>
            <figcaption>Add your Picture</figcaption>
        </figure>

        <input v-show="addButtonStatus" type="file" name="userfile"/>
    </section>
</template>

<script>
    import addButtonImage from "../assets/add-btn.png";

    export default{
        name: "add-button",
        data(){
            return{
                addButtonStatus: false,
                addButtonImage
            }
        }
    }
</script>

<style scope lang="scss">
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
</style>