<template>
   <section class="grid-section image-section" :style="{'background': `url(${src})`}">
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
    }
}
</script>

<style lang="scss" scope>

</style>