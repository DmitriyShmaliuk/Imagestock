<template>
    <v-container class="comment-section">
        <v-container class="information">
            <p>{{userName}}</p>
            <p>{{commentDate}}</p>
        </v-container>

        <v-container class="comment">

        </v-container>
    </v-container>
</template>

<script>
import {getDateString} from 'auxiliary-functions';
export default {
    name: "comment-section",
    computed: {
        commentDate(){
            return getDateString(this.date);
        }
    },
    props: {
        userName: {
            type: String,
            default: "User Name"
        },
        date:{
            type: Date,
            default: function(){
                return new Date();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .comment-section{
        width: 100%;
        margin-bottom: 10px;
        padding: 0;
        border: 1px solid green;

        .information{
            display: flex;
            justify-content: space-between;
            padding: 0;
        }
    }
</style>