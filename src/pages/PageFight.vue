<script>
import { store } from '../store.js';

export default {
    data() {
        return {
        randomCharacter: null,  // Personaggio casuale
        selectedCharacter: null,  // Personaggio selezionato
        store,                  // Reactive store
        };
    },

    created() {
        // Ottieni lo slug dalla route e carica i personaggi
        const slug = this.$route.params.slug;
        this.loadSelectedCharacters(slug);
    },

    methods: {
        // Funzione per caricare sia il personaggio selezionato che quello casuale
        loadSelectedCharacters(slug) {
            // Usa lo store per ottenere il personaggio selezionato
            this.store.getCharacter(slug);
            
            // Carica tutti i personaggi
            this.store.getCharacters();

            // Imposta un piccolo timeout per attendere il caricamento (se necessario)
            setTimeout(() => {
                this.selectedCharacter = this.store.character;  // Assegna il personaggio selezionato dallo store
                this.randomCharacter = this.getRandomCharacter(this.store.characters, this.selectedCharacter);  // Seleziona un personaggio casuale che non sia uguale a quello selezionato
            }, 500);  // Aggiungi un ritardo per assicurarti che i dati siano caricati (in base alle tempistiche API)
        },

        // Funzione per selezionare un personaggio casuale
        getRandomCharacter(characters, selectedCharacter) {
        // Crea un array che esclude il personaggio selezionato
        const filteredCharacters = characters.filter(character => character.slug !== selectedCharacter.slug);
        
        // Se ci sono personaggi disponibili dopo il filtraggio, scegli uno casuale
        if (filteredCharacters.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredCharacters.length);
            return filteredCharacters[randomIndex];
        }
        
        // In caso non ci siano personaggi disponibili, ritorna null
        return null;
    }
    },
};
</script>

<template>
        <div class="fight-page">
        <h1 class="text-white">Fight: {{ selectedCharacter?.name }} vs {{ randomCharacter?.name }}</h1>
        <div class="fight-arena">
            <div class="character selected">  <!-- Applica la classe selected dinamicamente -->
            <h2 :class="`text-${store.character?.type.name.toLowerCase()}`">{{ selectedCharacter?.name }}</h2>
            <img :src="`${store.baseUrl}${selectedCharacter?.type.image}`" alt="">
            </div>
            <div class="character">  <!-- Nessuna classe speciale qui -->
            <h2 :class="`text-${this.randomCharacter?.type.name.toLowerCase()}`">{{ randomCharacter?.name }}</h2>
            <img :src="`${store.baseUrl}${randomCharacter?.type.image}`" alt="">
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
    transform: scaleX(-1);  /* Specchia solo il personaggio selezionato */
    }
</style>