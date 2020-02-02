<template>
    <v-container class="popup" v-if="isPopupOpened">
        <v-container class="popup-content">
            <v-container class="close-icon"
                         @click="$emit('update:isPopupOpened', false)">
                <v-icon color="#21b8c6" :size="35">mdi-close</v-icon>
            </v-container>

            <v-container class="image-content">
                <v-container class="image-section">
                    <v-img :src="src"
                            :height="550"
                            width="auto"
                            alt="no-image"></v-img>
                </v-container>

                <v-container class="reaction-section">
                    <v-container class="dislike-icon"
                                 :class="{active: isDislikeClicked}"
                                 @click="clickDislike">
                        <v-icon :size="30"
                                :color="disLikeColor">mdi-thumb-down</v-icon>

                        <div class="badge">
                            {{countOfDislike}}
                        </div>
                    </v-container>
                    <v-container class="like-icon"
                                 :class="{active: isLikeClicked}"
                                 @click="clickLike">
                        <v-icon :size="30"
                                :color="likeColor">mdi-thumb-up</v-icon>

                        <div class="badge">
                            {{countOfLike}}
                        </div>
                    </v-container>
                </v-container>
            </v-container>

            <v-container class="messages-content">
                <header>
                    <h2>Comments: {{comments.length}}</h2>
                </header>

                <article class="comments-section">
                    <comment-section v-for="(comment,index) in comments"
                                     :user-name="comment.userName"
                                     :comment="comment.userComment"
                                     :date="comment.date"
                                     :key="`comment-${index}`"></comment-section>
                </article>

                <comments-form @send-info="addComment"></comments-form>
            </v-container>
        </v-container>
    </v-container>
</template>

<script>
import {mapActions} from 'vuex';
import defaultImage from '../assets/no-image.png';
import commentsForm  from  './comment-form.vue';
import commentSection from './comment-section';

export default{
    name: "popup",
    props: {
        isPopupOpened: {
            type: Boolean,
            default: false
        },
        src: {
            type: String,
            default: defaultImage,
        },
        countOfLike: {
            type: Number,
            default: 0,
        },
        countOfDislike: {
            type: Number,
            default: 0,
        },
        isLikeClicked:{
            type: Boolean,
            default: false
        },
        isDislikeClicked:{
            type: Boolean,
            default: false
        },
        comments: {
            type: Array,
            default: function(){
                return []
            }
        }
    },
    components: {
        commentSection,
        commentsForm
    },
    computed:{
        likeColor(){
            return (this.isLikeClicked)? "#ffffff" : "#a0b0ba";
        },
        disLikeColor(){
            return (this.isDislikeClicked)? "#ffffff" : "#a0b0ba";
        }
    },
    methods: {
        ...mapActions(['incrementLikes', 'incrementDislikes']),
        addComment(comment){
            if(comment.userName && comment.userComment){
                    this.$emit('add-comment', comment);
            }
        },
        clickLike(){
            this.incrementLikes();
        },
        clickDislike(){
           this.incrementDislikes();
        }
    }
}
</script>

<style lang="scss" scoped>
    .popup{
        position: absolute;
        display: flex;
        align-items:  center;
        justify-content:center;
        top: -25px;
        left: -25px;
        min-width: 1024px;
        height: 768px;
        padding: 0;
        background: rgba(242,244,246,0.7);

        .popup-content{
            position: relative;
            width: 810px;
            height: 595px;
            overflow: hidden;
            border-radius: 10px;
            background-color: #ffffff;

            .close-icon{
                position: absolute;
                top: 0;
                right: 0;
                width: auto;
                z-index: 2
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
    }
</style>