<template>
    <v-container class="comment-section">
        <v-container class="information">
            <p>By {{userNameString}}</p>
            <p>{{commentDate}}</p>
        </v-container>

        <v-container class="comment">
            {{comment}}
        </v-container>
    </v-container>
</template>

<script>
import {getDateString} from 'auxiliary-functions';

export default {
    name: "comment-section",
    computed: {
        commentDate(){
            return getDateString(new Date(this.date));
        },
        userNameString(){
            return this.userName.slice(0,20);
        }
    },
    props: {
        userName: {
            type: String,
            default: "User Name"
        },
        comment:{
            type: String,
            required: true
        },
        date:{
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
    .comment-section{
        width: 100%;
        margin-bottom: 10px;
        padding: 0;

        .information {
            display: flex;
            justify-content: space-between;
            padding: 0;

            & > p {
                margin: 0;
                font-family: Roboto, sans-serif;
                font-size: 12px;
                color: #95a7b3;
            }
        }

        .comment {
            min-height: 32px;
            padding: 5px;
            overflow: hidden;
            font-family: Roboto, sans-serif;
            font-size: 14px;
            color: #607583;
            border-radius: 3px;
            border: 1px solid #a0b0ba;
        }
    }
</style>