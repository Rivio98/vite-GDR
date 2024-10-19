<script>
import { store } from '../store.js';
export default {
  name: 'HeaderComp',
  data() {
    return {
      store,
    }
  },
  methods: {
    isActiveRoute(routeName) {
      return this.$route.name === routeName;
    }
  }
}

</script>

<template>
  <header>
    <nav class="navbar h-100 navbar-expand-lg bg-dark px-5 py-0">
      <div class="container-fluid">
        <router-link :to="{ name: 'homepage' }" class="navbar-brand text-white m-cust" href="#">GDR</router-link>
        <button class="navbar-toggler border-white" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
          aria-label="Toggle navigation">
          <i class="fa-solid fa-bars text-white"></i>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <ul class="navbar-nav">
            <li v-for="item, in store.zuccherinos">
              <router-link class="nav-link col-link" :class="{ active: isActiveRoute(item.name) }" aria-current="page"
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


.col-link {
  color: $color_link;
}


.navbar li {
  margin: 0px 10px;
}

.nav-link {
  border-top: 3px solid #212529;
  text-align: center;

  &:hover {
    color: $color_text
  }
}

.nav-link.col-link.active {
  color: white;
  border-bottom: 3px solid $color_text;

}

h4 {
  font-size: 16px;
}


.m-cust {
  margin: 4px 0px 0px 0px;
}
</style>
