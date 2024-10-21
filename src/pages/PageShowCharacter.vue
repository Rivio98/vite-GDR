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
        <div class="container mt-3 mb-2" v-if="character">
            <div class="row">
                <div class="col-6">
                    <router-link :to="{ name: 'characters' }" class="text-decoration-none">
                        <div class="d-flex align-items-baseline color">
                            <i class="fa-solid fa-rotate-left fa-2xl"></i>
                            <h3 class="ms-3">Back</h3>
                        </div>
                    </router-link>
                </div>
            </div>

            <div class="container card character-card b-grey text-bg-dark py-3 px-0 rounded-5">
                <div class="row">
                    <div class="col-12">
                        <div class="content text-center">
                            <h1 :class="`text-${character.type.name.toLowerCase()}`">{{ character.name }}</h1>
                            <div class="row">
                                <div class="col-12">
                                    <div class="btn-group dropdown w-100">
                                        <button class="btn btn-lg dropdown-toggle text-white " type="button"
                                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span :class="`text-${character.type.name.toLowerCase()}`">{{
                                                character.type.name }}
                                            </span> &nbsp;
                                        </button>
                                        <div class="dropdown-menu w-100 m-0 p-1 text-bg-dark text-center rounded-5">
                                            <div class="text-center rounded-bottom-5 h-425">
                                                <p class="overflow-auto h-100">
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

                <div class="row">
                    <div class="col-6 col-md-3 order-0 offset-3 offset-md-0">
                        <div class="content my-3">
                            <img :src="`${store.baseUrl}${character.type.image}`" class="img-fluid "
                                alt="Character Image">
                        </div>
                    </div>
                    <div class="col-6 col-md-3 order-2 order-md-1">
                        <div class="content m-3">
                            <h4>Weapons:</h4>
                            <div v-if="character.items.length > 0">
                                <div class="d-flex justify-content-between py-2" v-for="item in character.items"
                                    :key="item.id">
                                    <p>{{ item.name }}</p>
                                    <img :src="`${store.baseUrl}${item.image}`" alt="Item Image" class="img-fluid"
                                        id='item-img'>
                                </div>
                            </div>
                            <span v-else class="text-danger">Il personaggio non possiede armi</span>
                        </div>
                    </div>
                    <div class="col-md-5 order-1">
                        <div class="content m-3">
                            <h4>Stats:</h4>
                            <table class="table table-sm table-borderless table-dark">
                                <tbody>
                                    <tr>
                                        <th>Forza</th>
                                        <td>{{ character.strength }}</td>
                                    </tr>
                                    <tr>
                                        <th>Difesa</th>
                                        <td>{{ character.defense }}</td>
                                    </tr>
                                    <tr>
                                        <th>Velocità</th>
                                        <td>{{ character.speed }}</td>
                                    </tr>
                                    <tr>
                                        <th>Intelligenza</th>
                                        <td>{{ character.intelligence }}</td>
                                    </tr>
                                    <tr>
                                        <th>Vita</th>
                                        <td>{{ character.life }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="content text-center mx-3 my-2">
                            <p class="mb-4">{{ character.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-center">Caricamento...</div>
    </section>
</template>

<style lang="scss" scoped>
@use '../styles/variables/color_classes' as *;
@use '../styles/variables/colorText' as *;


.color {
    color: $color_text;
}

.color_link {
    color: $color_link;
}

.b-grey {
    border: 5px solid rgb(72, 67, 67);
}

.h-425 {
    height: 425px;
}

.character-card {
    #character-img {
        width: 300px;
        height: 300px;
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