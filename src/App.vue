<script>
import HeaderComp from './components/HeaderComp.vue'
import PageHome from './pages/PageHome.vue';

export default {
  components: {
    HeaderComp,
    PageHome,
  },
}
</script>

<template>

  <HeaderComp />
  <main>
    <router-view></router-view>
  </main>
</template>

<style lang="scss">
@use './styles/generals.scss';

main {
  height: calc(100vh - 45px);
}

section {
  height: 100%;
  overflow: auto;
}
</style>
