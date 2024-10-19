<script>
import { store } from '../store.js';
import CharacterCard from '../components/CharacterCard.vue';

export default {
    name: 'PageCharacters',
    components: {
        CharacterCard,
    },
    data() {
        return {
            store,
        }
    },
    created() {
        store.getCharacters();
    },

}
</script>

<template>
    <section>
        <div class="container my-5 my-lg-3">
            <div class="row">
                <div class="col-12">
                    <h2 class="text-center text-white">Seleziona un combattente per la sfida</h2>
                </div>
            </div>
            <div class="row row-cols-1 row-cols-md-3 g-4 mt-3">
                <CharacterCard v-for="character in store.characters" :key="character.id" :character="character" />
            </div>
        </div>
    </section>

</template>

<style lang="scss" scoped></style>