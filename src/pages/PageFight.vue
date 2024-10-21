<script>
import { store } from '../store.js';

export default {
    data() {
        return {
            randomCharacter: null,  // Personaggio casuale
            selectedCharacter: null,  // Personaggio selezionato
            store,                  // Store reattivo
        };
    },

    async created() {
        // Ottieni lo slug dalla route e carica i personaggi
        const slug = this.$route.params.slug;
        await this.loadSelectedCharacters(slug);
    },

    methods: {
        lifeBarClass(life) {
            if (life < 40) {
                return 'life-bar-red';
            } else if (life >= 40 && life < 60) {
                return 'life-bar-yellow';
            } else {
                return 'life-bar-green';
            }
        },
        // Funzione per caricare sia il personaggio selezionato che quello casuale
        async loadSelectedCharacters(slug) {
            try {
                // Usa lo store per ottenere il personaggio selezionato
                await this.store.getCharacter(slug);
                this.selectedCharacter = this.store.character;  // Assegna il personaggio selezionato dallo store

                // Assicurati che `selectedCharacter` sia stato caricato prima di caricare tutti i personaggi
                if (this.selectedCharacter) {
                    await this.store.getCharacters();
                    this.randomCharacter = this.getRandomCharacter(this.store.characters, this.selectedCharacter);
                } else {
                    console.error("Personaggio selezionato non trovato");
                }
            } catch (error) {
                console.error("Errore nel caricamento dei personaggi:", error);
            }
        },

        // Funzione per selezionare un personaggio casuale
        getRandomCharacter(characters, selectedCharacter) {
            // Assicura che selectedCharacter non sia nullo
            if (!selectedCharacter) {
                return null;
            }

            // Crea un array che esclude il personaggio selezionato
            const filteredCharacters = characters.filter(character => character.slug !== selectedCharacter.slug);

            // Se ci sono personaggi disponibili dopo il filtraggio, scegli uno casuale
            if (filteredCharacters.length > 0) {
                const randomIndex = Math.floor(Math.random() * filteredCharacters.length);
                return filteredCharacters[randomIndex];
            }

            // In caso non ci siano personaggi disponibili, ritorna null
            return null;
        },
    },
};
</script>


<template>
    <div class="fight-page">
        <div class="fight-arena">
            <div v-if="selectedCharacter" class="character selected"> <!-- Applica la classe selected dinamicamente -->
                <h2 :class="`text-${store.character?.type.name.toLowerCase()}`">{{ selectedCharacter?.name }}</h2>
                <img :src="`${store.baseUrl}${selectedCharacter?.type.image}`" alt="">
                <div class="life-bar" :class="lifeBarClass(selectedCharacter?.life)"
                    :style="{ width: `${selectedCharacter?.life}%` }">
                    {{ selectedCharacter?.life }}
                </div>
            </div>
            <div>
                <h1 class="text-white">VS</h1>
            </div>
            <div v-if="randomCharacter" class="character"> <!-- Nessuna classe speciale qui -->
                <h2 :class="`text-${this.randomCharacter?.type.name.toLowerCase()}`">{{ randomCharacter?.name }}</h2>
                <img :src="`${store.baseUrl}${randomCharacter?.type.image}`" alt="">
                <div class="life-bar" :class="lifeBarClass(randomCharacter?.life)"
                    :style="{ width: `${randomCharacter?.life}%` }">
                    {{ randomCharacter?.life }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables/color_classes' as *;

.fight-page {
    text-align: center;
    margin-top: 30px;
}


.fight-arena {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
}

.character {
    width: 200px;
}

.character img {
    width: 100%;
    border-radius: 10px;
}

.character.selected img {
    transform: scaleX(-1);
    /* Specchia solo il personaggio selezionato */
}

.life-bar {
    height: 20px;
    border-radius: 5px;
    margin-top: 10px;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
}

.life-bar-red {
    background-color: red;
}

.life-bar-yellow {
    background-color: yellow;
    color: black;
}

.life-bar-green {
    background-color: green;
}
</style>