import { reactive } from 'vue';
import axios from 'axios';

export const store = reactive({
    baseUrl: 'http://127.0.0.1:8000',
    characters: [],
    character: null,
    loading: false,

    async getCharacters() {
        this.loading = true;
        try {
            const results = await axios.get(`${this.baseUrl}/api/characters`);
            this.characters = results.data.results;
        } catch (error) {
            console.error("Errore durante il caricamento dei personaggi:", error);
        }
        this.loading = false;
    },

    async getCharacter(slug) {
        this.loading = true;
        try {
            this.character = null; // Resetta character
            const results = await axios.get(`${this.baseUrl}/api/character/${slug}`);
            this.character = results.data.results;
        } catch (error) {
            console.error("Errore durante il caricamento del personaggio:", error);
        }
        this.loading = false;
    },

    zuccherinos: [
        {
            name: 'homepage',
            label: 'Home'
        },
        {
            name: 'characters',
            label: 'Characters'
        },
        // {
        //     name: 'contact',
        //     label: 'Contact Me'
        // },
    ]
});