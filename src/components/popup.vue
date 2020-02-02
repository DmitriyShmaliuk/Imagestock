<template>
    <transition name="fade">
        <v-container class="popup" v-if="isPopupOpened">
            <v-container class="popup-content">
                <v-container class="close-icon"
                             @click="$emit('update:isPopupOpened', false)">
                    <v-icon color="#21b8c6" :size="35">mdi-close</v-icon>
                </v-container>

                <slot></slot>
            </v-container>
        </v-container>
    </transition>
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
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
