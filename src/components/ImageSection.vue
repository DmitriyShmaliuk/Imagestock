<template>
   <section class="grid-section image-section"
            :style="{'background': `url(${src})`}"
            @mouseover="isReactionSectionOpen = !isReactionSectionOpen"
            @mouseout="isReactionSectionOpen = !isReactionSectionOpen">
      <div class="reaction"
           :class="{active: isReactionSectionOpen}"
      ></div>
   </section>
</template>

<script>
export default{
    name: "image-section",
    props: {
       src: {
          type: String,
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
   }
</style>