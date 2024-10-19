<script>
import Header from './components/Header.vue'
import PageHome from './pages/PageHome.vue';

export default {
  components: {
    Header,
    PageHome,
  },
}
</script>

<template>
  <Header />
  <main>
    <router-view></router-view>
  </main>
</template>

<style lang="scss">
@use './styles/generals.scss';

main {
  height: calc(100vh - 60px);
}

section {
  height: 100%;
  overflow: auto;
}
</style>
