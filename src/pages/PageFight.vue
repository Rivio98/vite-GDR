<script>
import { store } from '../store.js'; // Importa lo store

export default {
    props: {
        slug: String,  // Ricevi lo slug del personaggio selezionato tramite props
    },

    data() {
        return {
        selectedCharacter: null,  // Il personaggio scelto dall'utente
        randomCharacter: null,    // Un personaggio casuale
        store,                    // Importiamo il reactive store
        };
    },

    mounted() {
        // Chiama le funzioni nello store per ottenere i dati dei personaggi
        this.store.getCharacter(this.slug);    // Ottieni il personaggio selezionato dallo store
        this.store.getCharacters();            // Ottieni tutti i personaggi per selezionarne uno casuale
        this.loadCharacters();
    },

    methods: {
        loadCharacters() {
        // Usa un watcher per attendere il caricamento del personaggio selezionato e di tutti i personaggi
        this.$watch(
            () => this.store.character,
            (newCharacter) => {
            this.selectedCharacter = newCharacter; // Assegna il personaggio selezionato
            }
        );
        
        this.$watch(
            () => this.store.characters,
            (characters) => {
            if (characters.length > 0) {
                this.randomCharacter = this.getRandomCharacter(characters); // Seleziona un personaggio casuale
            }
            }
        );
    },
    getRandomCharacter(characters) {
      // Funzione per scegliere un personaggio casuale dalla lista dei personaggi
      const randomIndex = Math.floor(Math.random() * characters.length);
      return characters[randomIndex];
    },
  },
};
</script>
<template>
        <div class="fight-page">
        <h1>Fight: {{ selectedCharacter.name }} vs {{ randomCharacter.name }}</h1>
        <div class="fight-arena">
            <div class="character">
            <h2>{{ selectedCharacter.name }}</h2>
            <img :src="`${store.baseUrl}${selectedCharacter.type.image}`" alt="Selected Character">
            </div>
            <div class="character">
            <h2>{{ randomCharacter.name }}</h2>
            <img :src="`${store.baseUrl}${randomCharacter.type.image}`" alt="Random Character">
            </div>
        </div>
        </div>
  </template>
  <style scoped>
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
  </style>