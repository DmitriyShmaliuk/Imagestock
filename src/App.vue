<template>
    <v-app>
        <header>
            <h1>Welcome to <span>imagestock</span></h1>
        </header>

        <main>
            <image-section v-for="(image,index) in images"
                           :countOfComments="image.comments.length"
                           :src="image.src"
                           :countOfLike="image.countOfLike"
                           :countOfDislike="image.countOfDislike"
                           :isLikeClicked.sync="image.isLikeClicked"
                           :isDislikeClicked.sync="image.isDislikeClicked"
                           :style="image.style"
                           :index="index"
                           :key="`image-${index}`"
                           @open-popup="openPopup">
            </image-section>

            <add-button @add-image="addImageSection"></add-button>

            <popup :isPopupOpened.sync="isPopupOpened"
                   v-bind="images[currentIndex]"
                   @add-comment="addComment">
            </popup>
        </main>
    </v-app>
</template>

<script>
    import {store} from './store/store';
    import {mapState, mapActions} from 'vuex';
    import addButton from "./components/add-button.vue";
    import imageSection from "./components/image-section.vue";
    import popup from "./components/popup.vue";

    export default {
        name: 'app',
        store,
        data() {
            return {
                isPopupOpened: false,
                countGridBlocks: 1,
            }
        },
        computed:{
            ...mapState(['images','currentIndex'])
        },
        created() {
            const IMAGES_STORE = localStorage.getItem("images-store");

            if (IMAGES_STORE){
                const localeStore = JSON.parse(IMAGES_STORE);

                Array.prototype.forEach.call(localeStore, (el)=>{
                   this.addImage(el);
                });

                this.countGridBlocks = Math.trunc(this.images.length / 9) + 1;
            }
        },
        components: {
            addButton,
            imageSection,
            popup
        },
        methods:{
            ...mapActions(['addImage','setCurrentIndex']),
            addImageSection(image){
                let insertElement = {
                  src: image,
                  style: {},
                  countOfLike: 0,
                  countOfDislike: 0,
                  isLikeClicked: false,
                  isDislikeClicked: false,
                  comments: [],
                };

                if (this.countGridBlocks >= 2 ){
                    let currentPosition = (this.images.length + 1) - ((this.countGridBlocks-1)*9);

                    if (currentPosition === 1){
                        insertElement.style = {
                            gridColumnStart: 5 * (this.countGridBlocks - 1),
                            gridColumnEnd: 5 * (this.countGridBlocks - 1) + 2,
                        }
                    }
                    else if (currentPosition === 5){
                        insertElement.style = {
                            gridColumnStart: 6 * (this.countGridBlocks - 1),
                            gridColumnEnd: 6 * (this.countGridBlocks - 1) + 2,
                            gridRowStart: 3,
                            gridRowEnd: 4,
                        }
                    }

                    else if (currentPosition === 6){
                        insertElement.style = {
                            gridColumnStart: 7 * (this.countGridBlocks - 1),
                            gridColumnEnd: 7 * (this.countGridBlocks - 1),
                            gridRowStart: 1,
                            gridRowEnd: 3,
                        }
                    }
                }

                this.addImage(insertElement);

                if(this.images.length % 9 === 0){
                    ++this.countGridBlocks;
                }
            },
            addComment({userName, userComment}){
                this.images[this.currentElement].comments.push({
                        userName,
                        userComment,
                        date: new Date().toString()
                    });

                localStorage.setItem("images-store", JSON.stringify(this.images));
            },
            openPopup(index){
                this.setCurrentIndex(index);
                this.isPopupOpened = true;
            }
        }
    }

</script>

<style scoped lang="scss">
    header {
        position: relative;
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
      height: 660px;
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
