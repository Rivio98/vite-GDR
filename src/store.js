import { reactive } from 'vue'
import axios from 'axios';

export const store = reactive({
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