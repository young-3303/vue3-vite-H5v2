<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="flex-box">
      <div class="c1"></div>
      <div class="c2"></div>
    </div>
  </div>
</template>
<script setup>
</script>
<style lang="scss">
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.flex-box {
  display: flex;
  //gap: 20px;
  @include gap(20px);
  .c1 {
   background: aqua;
  }
  .c2 {
    background: rosybrown;
  }
  >div {
    width: 200px;
    height: 200px;
  }
}
</style>
