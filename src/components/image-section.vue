<template>
   <section class="grid-section image-section" :style="{background: `url(${src})`}">
   </section>
</template>

<script>
export default{
    name: "image-section",
    props: ['src']
}
</script>

<style scope>
</style>