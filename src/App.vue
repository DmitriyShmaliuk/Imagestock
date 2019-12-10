<template>
  <div id="app">
    <header>
      <h1>Welcome to <span>imagestock</span></h1>
    </header>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      message: "Message",
    }
  }
}
</script>

<style scope lang="scss">
header{
  margin-bottom: 10px;
  position: relative;
  z-index: 3;

  h1{
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
    color: #8499a7;

    span{
      color: #21b8c6;
    }
  }
}
</style>

<style>
body{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
}
#app {
  width: 1024px;
  height: 768px;
  padding: 25px;
  background: #f0f3f6;
}
</style>
