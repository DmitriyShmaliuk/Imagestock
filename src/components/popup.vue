<template>
    <v-container class="background" v-if="isPopupOpened">
        <v-container class="popup">
            <v-container class="close-icon"
                         @click="$emit('update:isPopupOpened', false)">
                <v-icon color="#21b8c6"
                        :size="35"
                >mdi-close</v-icon>
            </v-container>

            <v-container class="popup-content">
                <v-container class="image-section">
                    <v-img :src="src"
                            :height="550"
                            width="auto"
                            alt="no-image"></v-img>
                </v-container>

                <v-container class="reaction-section">
                    <v-container class="dislike-icon">

                    </v-container>
                    <v-container class="like-icon">

                    </v-container>
                </v-container>
            </v-container>
        </v-container>
    </v-container>
</template>

<script>
import defaultImage from '../assets/no-image.png';

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
        }
    }
}
</script>

<style lang="scss" scoped>
    .background{
        position: absolute;
        display: flex;
        align-items:  center;
        justify-content:center;
        top: -25px;
        left: -25px;
        width: 1024px;
        height: 768px;
        padding: 0;
        background: rgba(242,244,246,0.7);

        .popup{
            position: relative;
            width: 810px;
            height: 595px;
            border-radius: 10px;
            background-color: #ffffff;

            .close-icon{
                position: absolute;
                top: 0;
                right: 0;
                width: auto;
            }

            .popup-content{
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
                        width: 65px;
                        height: 60px;

                        border: 1px solid red;
                    }
                }
            }

        }
    }
</style>