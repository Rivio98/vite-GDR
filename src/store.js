import { reactive } from 'vue'
import axios from 'axios';


export const store = reactive({
    baseUrl: 'http://127.0.0.1:8000',
    characters: [],
    character: null,

    getCharacters() {
        axios.get(`${this.baseUrl}/api/characters`).then((results) => {
            console.log(results.data)
            this.characters = results.data.results;
        })
    },
    getCharacter(slug) {
        this.character = null;
        axios.get(`${this.baseUrl}/api/character/${slug}`).then((results) => {
            this.character = results.data.results;
        });;
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