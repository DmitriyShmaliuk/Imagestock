<template>
    <section id="addBtn" class="grid-section">
       <label>
           <figure>
               <img :src="addButtonImage" alt="add button"/>
               <figcaption>Add your Picture</figcaption>
            </figure>

           <input @change="addSection" v-show="addButtonStatus" type="file"/>
       </label>
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
        },
        methods: {
            addSection({target}){
                let reader = new FileReader();

                reader.onloadend = () => {
                    this.$emit('add-image', reader.result);
                }

                if (target.files[0]) {
                    reader.readAsDataURL(target.files[0]);
                }
            }
        }
    }
</script>

<style scope lang="scss">
    #addBtn{
        cursor: pointer;

        figure{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 72px;
            margin-top: -45px;
            margin-left: -36px;

            img{
                display: block;
                width: 52px;
                margin: 0 auto;
                cursor: pointer;
            }

            figcaption{
                width: 72px;
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                color: #a0b0ba;
                cursor: pointer;
            }
        }
    }
</style>