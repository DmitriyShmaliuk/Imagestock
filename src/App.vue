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
                           @open-popup="openPopup"
                           @dislike="dislike"
                           @like="like"
                          >
            </image-section>

            <add-button @add-image="addImageSection"></add-button>

            <popup :isPopupOpened.sync="isPopupOpened">
                <v-container class="image-content">
                    <v-container class="image-section">
                        <v-img :src="currentObject.src"
                                :height="550"
                                width="auto"
                                alt="no-image"></v-img>
                    </v-container>

                    <v-container class="reaction-section">
                        <v-container class="dislike-icon"
                                     :class="{active: currentObject.isDislikeClicked}"
                                     @click="dislike">
                            <v-icon :size="30"
                                    :color="disLikeColor">mdi-thumb-down</v-icon>

                            <div class="badge">
                                {{this.currentObject.countOfDislike}}
                            </div>
                        </v-container>
                        <v-container class="like-icon"
                                     :class="{active: this.currentObject.isLikeClicked}"
                                     @click="like">
                            <v-icon :size="30"
                                    :color="likeColor">mdi-thumb-up</v-icon>

                            <div class="badge">
                                {{currentObject.countOfLike}}
                            </div>
                        </v-container>
                    </v-container>
                </v-container>

                 <v-container class="messages-content">
                    <header>
                        <h2>Comments: {{currentObject.comments && currentObject.comments.length}}</h2>
                    </header>

                    <article class="comments-section">
                        <comment-section v-for="(comment,index) in currentObject.comments"
                                         :user-name="comment.userName"
                                         :comment="comment.userComment"
                                         :date="comment.date"
                                         :key="`comment-${index}`"></comment-section>
                    </article>

                    <comment-form @send-info="comment"></comment-form>
                </v-container>
            </popup>
        </main>
    </v-app>
</template>

<script>
    import {store} from './store/store';
    import {mapState, mapActions} from 'vuex';
    import addButton from "./components/add-button.vue";
    import imageSection from "./components/image-section.vue";
    import commentSection from "./components/comment-section.vue";
    import commentForm from "./components/comment-form.vue";
    import popup from "./components/popup.vue";

    export default {
        name: 'app',
        store,
        components: {
            addButton,
            imageSection,
            commentSection,
            commentForm,
            popup
        },
        data() {
            return {
                isPopupOpened: false,
                currentIndex: null,
                countGridBlocks: 1,
            }
        },
        computed:{
            ...mapState(['images']),
            currentObject(){
                return this.images[this.currentIndex] || {};
            },
            likeColor(){
                return (this.currentObject.isLikeClicked)? "#ffffff" : "#a0b0ba";
            },
            disLikeColor(){
                return (this.currentObject.isDislikeClicked)? "#ffffff" : "#a0b0ba";
            }
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
        methods:{
            ...mapActions(['addImage','setCurrentIndex', 'incrementLikes', 'incrementDislikes', 'addComment']),
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
            comment({userName, userComment}){
                const currentIndex = this.currentIndex;
                const commentData = {
                        userName,
                        userComment,
                        date: new Date().toString()
                    };

                this.addComment({index: currentIndex, commentData});
            },
            like(){
                this.incrementLikes(this.currentIndex);
            },
            dislike(){
                this.incrementDislikes(this.currentIndex);
            },
            openPopup(index){
                this.currentIndex = index;
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

      .image-content{
        position: absolute;
        top: 0;
        left: 0;
        width: 450px;
        padding: 0;

        .image-section {
            width: 100%;
            height: 515px;
            padding: 0;
            overflow: hidden;
        }

        .reaction-section{
                position: relative;
                width: 100%;
                height: 60px;
                background-color: #f5f6f4;

                .dislike-icon, .like-icon{
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    top: -10px;
                    width: 65px;
                    height: 60px;
                    background-color: #e0e5e9;

                    &.active{
                        transform: translateY(10px);
                        background-color: #d02828;
                    }

                    .badge{
                        position: absolute;
                        right: 8px;
                        top: 12px;
                        width: 17px;
                        height: 17px;
                        text-align: center;
                        vertical-align: middle;
                        color: #308a93;
                        font-size: 9px;
                        border-radius: 50%;
                        background-color: #ffffff;
                        border: 2px solid #a1b1bb;
                    }
                }

                .like-icon{
                    right: 0;
                }

                .dislike-icon{
                    right: 75px;
                }
            }
        }

        .messages-content{
            position: absolute;
            top: 10px;
            right: 10px;
            width: 320px;

            &::v-deep .comment-form{
                margin-top: 10px;
            }

            header{
                h2{
                    font-family: "Roboto", sans-serif;
                    font-size: 24px;
                    color: #8499a7;
                }
            }

            .comments-section{
                width: 300px;
                height: 410px;
                padding-right: 20px;
                overflow: auto;

                &::-webkit-scrollbar{
                    width: 7px;
                }
            }
        }
    }
</style>

<style>
    @import "main.css";
</style>
