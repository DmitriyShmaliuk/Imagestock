<template>
    <v-container class="background" v-if="isPopupOpened">
        <v-container class="popup">
            <v-container class="close-icon"
                         @click="$emit('update:isPopupOpened')">
                <v-icon color="#21b8c6"
                        :size="35"
                >mdi-close</v-icon>
            </v-container>

            <v-container class="image-section">

            </v-container>
        </v-container>
    </v-container>
</template>

<script>
    export default{
        name: "popup",
        props: {
            isPopupOpened: {
                type: Boolean,
                default: false
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

            .image-section {
                position: absolute;
                top: 0;
                left: 0;
                width: 450px;
                height: 515px;
                background-color: #f3f4f2;
            }
        }
    }
</style>