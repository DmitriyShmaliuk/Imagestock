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
                           @increment-like="incrementLike"
                           @increment-dislike="incrementDislike"
                           @decrement-like="decrementLike"
                           @decrement-dislike="decrementDislike"
                           @open-popup="openPopup">
            </image-section>

            <add-button @add-image="addImage"></add-button>

            <popup :isPopupOpened.sync="isPopupOpened"
                   v-bind.sync="images[currentElement]"
                   @add-comment="addComment"
                   @increment-like="incrementLike"
                   @increment-dislike="incrementDislike"
                   @decrement-like="decrementLike"
                   @decrement-dislike="decrementDislike">
            </popup>
        </main>
    </v-app>
</template>

<script>
    import {store} from './store/store';
    import addButton from "./components/add-button.vue";
    import imageSection from "./components/image-section.vue";
    import popup from "./components/popup.vue";

    export default {
        name: 'app',
        store,
        data() {
            return {
                images: [],
                isPopupOpened: false,
                countImagesSection: 1,
                currentElement: null,
            }
        },
        created() {
            const IMAGES_STORE = localStorage.getItem("images-store");

            if (IMAGES_STORE){
                const localeStore = JSON.parse(IMAGES_STORE);

                Array.prototype.forEach.call(localeStore, (el)=>{
                    this.images.push(el);
                });

                this.countImagesSection = Math.trunc(this.images.length / 9) + 1;
            }
            else{
                this.images = [];
            }
        },
        components: {
            addButton,
            imageSection,
            popup
        },
        methods:{
            addImage(image){
                this.images.push({src: image,
                                  style: {},
                                  countOfLike: 0,
                                  countOfDislike: 0,
                                  isLikeClicked: false,
                                  isDislikeClicked: false,
                                  comments: [],
                });

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

                localStorage.setItem("images-store", JSON.stringify(this.images));
            },
            addComment({userName, userComment}){
                this.images[this.currentElement].comments.push({
                        userName,
                        userComment,
                        date: new Date().toString()
                    });

                localStorage.setItem("images-store", JSON.stringify(this.images));
            },
            incrementLike(index){
                if (index !== undefined && !this.isPopupOpened){
                    if(!this.images[index].isLikeClicked) {
                        this.images[index].countOfLike++;
                        this.images[index].isLikeClicked = true;
                    }
                }
                else{
                    if(!this.images[this.currentElement].isLikeClicked) {
                        this.images[this.currentElement].countOfLike++;
                        this.images[this.currentElement].isLikeClicked = true;
                    }
                }

                localStorage.setItem("images-store", JSON.stringify(this.images));
            },
            incrementDislike(index){
                if (index !== undefined && !this.isPopupOpened){
                    if(!this.images[index].isDislikeClicked){
                        this.images[index].countOfDislike++;
                        this.images[index].isDislikeClicked = true;
                    }
                }
                else{
                    if(!this.images[this.currentElement].isDislikeClicked){
                        this.images[this.currentElement].countOfDislike++;
                        this.images[this.currentElement].isDislikeClicked = true;
                    }
                }

                localStorage.setItem("images-store", JSON.stringify(this.images));
            },
            decrementLike(index){
                if (index !== undefined && !this.isPopupOpened){
                    this.images[index].countOfLike--;
                    this.images[index].isLikeClicked = false;
                }
                else{
                    this.images[this.currentElement].countOfLike--;
                    this.images[this.currentElement].isLikeClicked = false;
                }

                localStorage.setItem("images-store", JSON.stringify(this.images));
            },
            decrementDislike(index){
                if (index !== undefined && !this.isPopupOpened){
                    this.images[index].countOfDislike--;
                    this.images[index].isDislikeClicked = false;
                }
                else{
                    this.images[this.currentElement].countOfDislike--;
                    this.images[this.currentElement].isDislikeClicked = false;
                }

                localStorage.setItem("images-store", JSON.stringify(this.images));
            },
            openPopup(index){
                this.currentElement = index;
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
