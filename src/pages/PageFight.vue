<script>
import { store } from '../store.js';

export default {
    data() {
        return {
            randomCharacter: null,
            selectedCharacter: null,
            store,
            fightResult: null,
            isAttacking: false,           // Per controllare quando un attacco è in corso
            currentAttacker: null,        // Per sapere chi sta attaccando
        };
    },

    async created() {
        const slug = this.$route.params.slug;
        await this.loadSelectedCharacters(slug);
        this.startFight();  // Inizia il combattimento automaticamente
    },

    methods: {
        async loadSelectedCharacters(slug) {
            try {
                await this.store.getCharacter(slug);
                this.selectedCharacter = this.store.character;

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

        getRandomCharacter(characters, selectedCharacter) {
            const filteredCharacters = characters.filter(character => character.slug !== selectedCharacter.slug);
            if (filteredCharacters.length > 0) {
                const randomIndex = Math.floor(Math.random() * filteredCharacters.length);
                return filteredCharacters[randomIndex];
            }
            return null;
        },

        async startFight() {
    let turn = 0;
    while (this.selectedCharacter.life > 0 && this.randomCharacter.life > 0) {
        // Determina attaccante e difensore in base al turno
        const attacker = turn % 2 === 0 ? this.selectedCharacter : this.randomCharacter;
        const defender = turn % 2 === 0 ? this.randomCharacter : this.selectedCharacter;

        this.currentAttacker = attacker;  // Imposta l'attaccante corrente
        this.isAttacking = true;          // Attiva l'animazione di attacco

        // Attendi il tempo dell'animazione prima di infliggere il danno
        await new Promise(resolve => setTimeout(resolve, 500));  // Allineato alla durata dell'animazione

        // Infliggi il danno quando l'attacco è completato
        this.attack(attacker, defender);

        // Aspetta per far rientrare l'attaccante prima del prossimo turno
        await new Promise(resolve => setTimeout(resolve, 500));

        this.isAttacking = false;  // Disattiva l'animazione

        turn++;
    }

    // Determina il vincitore
    if (this.selectedCharacter.life > 0) {
        this.fightResult = `${this.selectedCharacter.name} vince!`;
    } else {
        this.fightResult = `${this.randomCharacter.name} vince!`;
    }
},

attack(attacker, defender) {
    const damage = attacker.strength - defender.defense;
    const actualDamage = damage > 0 ? damage : 1; // Assicurati che ci sia almeno 1 danno
    defender.life -= actualDamage;

    if (defender.life < 0) {
        defender.life = 0; // La vita non può scendere sotto 0
    }
},

        lifeBarClass(life) {
            if (life < 40) {
                return 'life-bar-red';
            } else if (life >= 40 && life < 60) {
                return 'life-bar-yellow';
            } else {
                return 'life-bar-green';
            }
        },
    },
};
</script>


<template>
    <div class="fight-page">
        <div class="fight-arena">
            <!-- Personaggio selezionato -->
            <div 
                class="character selected"
                :class="{ 'character-attack-left': isAttacking && currentAttacker === selectedCharacter }">
                <h2 :class="`text-${selectedCharacter?.type.name.toLowerCase()}`">{{ selectedCharacter?.name }}</h2>
                <img :src="`${store.baseUrl}${selectedCharacter?.type.image}`" alt="">
                <div class="life-bar" :class="lifeBarClass(selectedCharacter?.life)"
                    :style="{ width: `${selectedCharacter?.life}%` }">
                    {{ selectedCharacter?.life }}
                </div>
            </div>

            <div>
                <h1 class="text-white">VS</h1>
            </div>

            <!-- Personaggio casuale -->
            <div 
                class="character"
                :class="{ 'character-attack-right': isAttacking && currentAttacker === randomCharacter }">
                <h2 :class="`text-${randomCharacter?.type.name.toLowerCase()}`">{{ randomCharacter?.name }}</h2>
                <img :src="`${store.baseUrl}${randomCharacter?.type.image}`" alt="">
                <div class="life-bar" :class="lifeBarClass(randomCharacter?.life)"
                    :style="{ width: `${randomCharacter?.life}%` }">
                    {{ randomCharacter?.life }}
                </div>
            </div>
        </div>

        <!-- Risultato del combattimento -->
        <div class="fight-result mt-4">
            <h2 class="text-white">{{ fightResult }}</h2>
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
    transition: transform 0.5s ease-in-out;  // Aggiungi transizione per l'attacco
}

.character img {
    width: 100%;
    border-radius: 10px;
}

.character.selected img {
    transform: scaleX(-1);  // Specchia solo il personaggio selezionato
}

/* Animazione per l'attacco del personaggio selezionato (da sinistra a destra) */
.character-attack-left {
    transform: translateX(100px);  // Muovi il personaggio selezionato verso destra (attacco)
}

/* Animazione per l'attacco del personaggio casuale (da destra a sinistra) */
.character-attack-right {
    transform: translateX(-100px);  // Muovi il personaggio casuale verso sinistra (attacco)
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

.fight-result {
    margin-top: 20px;
    h2 {
        color: white;
    }
}
</style>