<script>
import { store } from '../store.js';
export default {
    name: 'PageShowCharacter',

    data() {
        return {
            store,
        }
    },
    created() {
        const slug = this.$route.params.slug;
        store.getCharacter(slug);
    },
    computed: {
        character() {
            return store.character;
        }
    }

}
</script>


<template>
    <section>
        <div class="container mt-3 mb-2">

            <div class="row">
                <div class="col-6">
                    <router-link :to="{ name: 'characters' }" class="text-decoration-none">
                        <div class="d-flex align-items-center color">
                            <i class="fa-solid fa-rotate-left fa-2xl"></i>
                            <h3 class="ms-3">Back</h3>
                        </div>
                    </router-link>
                </div>
            </div>


            <div class="container card character-card b-grey bg-dark text-light p-4 rounded-5 h-100">
                <div class="row">
                    <div class="col-12">
                        <div class="content text-center">
                            <h1 :class="`text-${character.type.name.toLowerCase()}`">{{ character.name }}</h1>
                            <div class="row">
                                <div class="col-6">
                                    <h2 :class="`text-${character.type.name.toLowerCase()}`">{{ character.type.name }}
                                    </h2>
                                </div>
                                <div class="col-6">
                                    <div class="btn-group dropdown w-100">
                                        <button class="btn btn-secondary btn-lg dropdown-toggle w-100" type="button"
                                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Description
                                        </button>
                                        <div class="dropdown-menu w-100 m-0 p-1 bg-dark text-light text-center">
                                            <div>
                                                <h3 class="b-grey rounded-top-5 m-0 p-1">Class:</h3>
                                            </div>
                                            <div class="content text-center b-grey rounded-bottom-5">
                                                <p class="overflow-auto" style="max-height: 250px;">
                                                    {{ character.type.description }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="d-flex">
                        <div class="col-3">
                            <img :src="`${store.baseUrl}${character.type.image}`" class="img-fluid rounded"
                                alt="Character Image">
                        </div>
                        <div class="col-2 offset-1">
                            <h4>Weapons:</h4>
                            <div v-if="character.items.length > 0">
                                <div class="d-flex justify-content-between py-2" v-for="item in character.items"
                                    :key="item.id">
                                    <p>{{ item.name }}</p>
                                    <img :src="`${store.baseUrl}${item.image}`" alt="Item Image" class="img-fluid"
                                        id='item-img'>
                                </div>
                            </div>
                            <span v-else class="text-danger">- Il personaggio non ha armi -</span>
                        </div>
                        <div class="col-5 offset-1">
                            <table class="table table-borderless text-light">
                                <tbody>
                                    <tr>
                                        <th class="bg-dark text-light">Forza</th>
                                        <td class="bg-dark text-light">{{ character.strength }}</td>
                                    </tr>
                                    <tr>
                                        <th class="bg-dark text-light">Difesa</th>
                                        <td class="bg-dark text-light">{{ character.defense }}</td>
                                    </tr>
                                    <tr>
                                        <th class="bg-dark text-light">Velocità</th>
                                        <td class="bg-dark text-light">{{ character.speed }}</td>
                                    </tr>
                                    <tr>
                                        <th class="bg-dark text-light">Intelligenza</th>
                                        <td class="bg-dark text-light">{{ character.intelligence }}</td>
                                    </tr>
                                    <tr>
                                        <th class="bg-dark text-light">Vita</th>
                                        <td class="bg-dark text-light">{{ character.life }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-12">
                        <div class="content text-center">
                            <p class="mb-4">{{ character.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>

</template>

<style lang="scss" scoped>
@use '../styles/variables/color_classes' as *;

.character-card {
    #character-img {
        width: 300px;
        height: 300px;
        margin-left: 20px;
    }

    #item-img {
        width: 30px;
        height: 30px;
    }

    .table {
        height: 300px;
        margin-left: 10px;
    }

    .overflow-auto::-webkit-scrollbar {
        width: 10px;
    }

    .overflow-auto::-webkit-scrollbar-track {
        background: #2c2c2c;
    }

    .overflow-auto::-webkit-scrollbar-thumb {
        background-color: #6c757d;
        border-radius: 10px;
        border: 3px solid #2c2c2c;
    }

    .overflow-auto::-webkit-scrollbar-thumb:hover {
        background-color: #5a6268;
        border-bottom: 10px;
    }
}
</style>