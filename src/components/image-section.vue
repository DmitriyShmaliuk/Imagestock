<template>
   <section class="grid-section image-section"
            :style="{'background': `url(${src})`}"
            @mouseover="isReactionSectionOpen = !isReactionSectionOpen"
            @mouseout="isReactionSectionOpen = !isReactionSectionOpen">
      <v-container class="reaction" :class="{active: isReactionSectionOpen}">
         <figure class="dislike-icon"
                 @click="clickDislike">
            <v-icon color="#a0b0ba"
                    :size="28">mdi-thumb-down</v-icon>
            <div class="badge">
               {{countOfDislike}}
            </div>
         </figure>

         <figure class="like-icon"
                 @click="clickLike">
            <v-icon color="#a0b0ba"
                    :size="28">mdi-thumb-up</v-icon>
           <div class="badge">
              {{countOfLike}}
           </div>
         </figure>

         <figure class="comments-icon"
                 @click="$emit('open-popup', index)">
            <v-icon color="#a0b0ba"
                    :size="28">mdi-message-reply</v-icon>
            <div class="badge">
               {{countOfComments}}
            </div>
         </figure>
      </v-container>
   </section>
</template>

<script>
import {mapActions} from 'vuex';

export default{
    name: "image-section",
    props: {
       src: {
          type: String,
          required: true
       },
       countOfLike: {
          type: Number,
          default: 0
       },
       countOfDislike: {
          type: Number,
          default: 0
       },
       countOfComments: {
          type: Number,
          default: 0
       },
       isLikeClicked:{
          type: Boolean,
          default: false
       },
       isDislikeClicked:{
          type: Boolean,
          default: false
       },
       index: {
          type: Number,
          required: true
       }
    },
   data(){
       return{
          isReactionSectionOpen: false,
       }
   },
   methods:{
       ...mapActions(['incrementLikes', 'incrementDislikes','setCurrentIndex']),
       clickLike(){
          this.incrementLikes(this.index);
       },
      clickDislike(){
         this.incrementDislikes(this.index);
      }
   }
}
</script>

<style lang="scss" scope>
   .reaction{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 60px;
      background-color: #ffffff;
      transition: transform 0.5s linear;
      transform: translateY(60px);

      &.active{
         transform: translateY(0);
      }

      .dislike-icon, .like-icon, .comments-icon{
         position: absolute;
         top: 12px;
         width: 42px;
         height: 35px;

         & > i{
            position: absolute;
            bottom: 0;
            width: 30px;
         }

         .badge{
            position: absolute;
            right: 0;
            top: 3px;
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

      .comments-icon{
         left: 14px;
      }

      .dislike-icon{
         right: 64px;
      }

      .like-icon{
         right: 14px;
      }
   }
</style>