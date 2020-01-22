<template>
   <section class="grid-section image-section"
            :style="{'background': `url(${src})`}"
            @mouseover="isReactionSectionOpen = !isReactionSectionOpen"
            @mouseout="isReactionSectionOpen = !isReactionSectionOpen">
      <div class="reaction"
           :class="{active: isReactionSectionOpen}">
         <figure class="like-icon">
            <svg viewBox="0 0 24 24">
               <path fill="#a0b0ba" d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" />
            </svg>
           <div class="badge" @click="$emit('incrementLike',index)">
              {{countOfLike}}
           </div>
         </figure>
      </div>
   </section>
</template>

<script>
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
       index: {
          type: Number,
          required: true
       }
    },
   data(){
       return{
          isReactionSectionOpen: false
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

      & .like-icon{
         position: absolute;
         top: 12px;
         right: 14px;
         width: 37px;
         height: 35px;

         & > svg{
            position: absolute;
            bottom: 0;
            width: 30px;
         }
      }

      .badge{
         position: absolute;
         right: 0;
         top: 0;
         width: 17px;
         height: 17px;
         text-align: center;
         vertical-align: middle;
         color: #308a93;
         font-size: 9px;
         border-radius: 50%;
         border: 2px solid #a1b1bb;
      }
   }
</style>