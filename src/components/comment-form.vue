<template>
    <form class="comment-form">
        <input type="text" v-model="userName" placeholder="Type your nickname here"/>
        <textarea placeholder="Write your comment here..."></textarea>

        <button>
            <v-icon color="#ffffff"
                    :size="25">mdi-email</v-icon>
        </button>
    </form>
</template>

<script>
export default{
    name: "comment-form",
    data(){
        return {
            userName: "",
            userComment: ""
        }
    }
}
</script>

<style lang="scss" scoped>
    .comment-form{
        position: relative;
        width: 280px;
        height: 85px;

        input[type='text']{
            width: 100%;
            border-bottom: 1px solid #a0b0ba;
        }

        textarea{
            margin-top: 11px;
            width: 225px;
            height: 50px;
            border-radius: 3px;
            border: 1px solid #a0b0ba;

            &::-webkit-scrollbar{
                width: 0;
            }
        }

        input[type='text'], textarea{
            box-sizing: border-box;
            padding:  0 5px;
            font-size: 14px;
            outline: none;

            &:focus{

                border-color: #21b8c6;
            }
        }

        button{
            position: absolute;
            right: 0;
            bottom: 0;
            width: 50px;
            height: 50px;
            border-radius: 5px;
            outline: none;
            background-color: #21b8c6;

            .v-icon{
                transform: rotate(-45deg);
            }
        }
    }
</style>