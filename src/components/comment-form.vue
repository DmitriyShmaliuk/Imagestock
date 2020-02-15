<template>
    <form class="comment-form"
          @submit.prevent="sendInformation">

        <input type="text" v-model="userName" placeholder="Type your nickname here"/>
        <textarea placeholder="Write your comment here..."
                  v-model="userComment"></textarea>

        <button>
            <v-icon color="#ffffff" :size="25">mdi-email</v-icon>
        </button>

        <v-dialog max-width="360"
                  v-model="isError">
            <v-card>
                <v-card-title class="headline">
                    <h2>Error</h2>
                </v-card-title>

                <v-card-text>
                    {{errorMessage}}
                </v-card-text>

                <v-card-actions>
                    <v-btn color="#21b8c6" text
                           @click="isError = false">
                        OK
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </form>
</template>

<script>
export default{
    name: "comment-form",
    data(){
        return {
            userName: "",
            userComment: "",
            isError: false,
            errorMessage: "",
        }
    },
    methods:{
        sendInformation(){
            if (this.userName.length >= 2 && this.userComment.length >= 1) {
                this.$emit('send-info', {userName: this.userName, userComment: this.userComment});
                this.userName = this.userComment = "";
            }
            else {
                this.isError = true;
                this.errorMessage = "Please enter longer user name or enter comment!!!";
            }
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
            resize: none;
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

    .v-dialog{
       .v-card{
           .v-card__title{
               padding: 16px 0px 10px 15px;

               h2{
                   font-family: "Roboto", sans-serif;
                   font-size: 24px;
                   color: #8499a7;
               }
           }

           .v-card__text{
               padding: 0px 0px 5px 15px;
           }

           .v-card__actions{
               display: flex;
               justify-content: flex-end;
               padding-top: 0px;
               padding-right: 0px;

               .v-btn{
                   font-weight: bold;
               }
           }
       }
    }
</style>