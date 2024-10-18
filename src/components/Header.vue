<script>
import { store } from '../store.js';
export default {
  name: 'Header',
  data() {
    return {
      store,
    }
  },
  methods: {
    // Metodo per verificare se la rotta corrente è attiva
    isActiveRoute(routeName) {
      return this.$route.name === routeName;  // Confronta il nome della rotta corrente
    }
  }
}

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-dark p-0">
      <div class="container-fluid">
        <router-link :to="{ name: 'homepage' }" class="navbar-brand text-white" href="#">GDR</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul class="navbar-nav">
            <li v-for="item, in store.zuccherinos">
              <router-link class="nav-link text-white" :class="{ active: isActiveRoute(item.name) }" aria-current="page"
                :to="{ name: item.name }"> {{
                  item.label
                }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use '../styles/variables/colorText' as *;

header {
  height: 60px;
}

.navbar li {
  margin: 0px 10px;
}

.nav-link {
  border-top: 3px solid black;
}

.active {
  color: $color_text;
  border-bottom: 3px solid $color_text;
}

.nav-link:hover {
  color: $color_text;
}
</style>
