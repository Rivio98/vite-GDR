<script>
import { store } from '../store.js';
export default {
    name: 'CharacterCard',
    props: {
        character: Object,
    },
    data() {
        return {
            store,
        }
    },
}
</script>

<template>
    <div class="col">
        <div class="card b-grey h-100 text-bg-dark text-center rounded-5">
            <div class="text-center img-w">
                <img :src="`${store.baseUrl}${character.type.image}`" class="card-img-top" alt="character IMG">
            </div>
            <div class="card-body">
                <h4 class="card-title" :class="`text-${character.type.name.toLowerCase()}`">{{ character.name }}
                </h4>
                <p class="card-text">{{ character.description.substr(0, 40) +
                    '...' }}</p>
            </div>
            <ul class="list-group list-group-flush border-0">
                <li class="list-group-item">Forza: {{ character.strength }}</li>
                <li class="list-group-item">Difesa: {{ character.defense }}</li>
                <li class="list-group-item">Velocità: {{ character.speed }}</li>
                <li class="list-group-item">Intelligenza: {{ character.intelligence }}</li>
                <li class="list-group-item">Vita: {{ character.life }}</li>
            </ul>
            <div class="card-body ">
                <router-link :to="{ name: 'character', params: { slug: character.slug } }"
                    class="btn btn-outline-info mx-3">
                    SHOW MORE
                </router-link>
                <router-link :to="{name: 'fight', params: { slug: character.slug } }" class="btn btn-outline-danger"> FIGHT </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables/color_classes' as *;

.img-w {
    width: 206px;
    height: 206px;
    margin: 0 auto;
}

img {
    width: 100%;
    height: 100%;
}

.list-group-item {
    background-color: #212529;
    border: none;

    &:first-child {
        color: brown;
    }

    &:nth-child(2) {
        color: goldenrod;
    }

    &:nth-child(3) {
        color: lightblue;
    }

    &:nth-child(4) {
        color: darkorchid;
    }

    &:nth-child(5) {
        color: darkseagreen;
    }
}

.b-grey {
    border: 5px solid rgb(72, 67, 67);
}
</style>