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
                    this.selectedCharacter.maxLife = this.selectedCharacter.life;
                    await this.store.getCharacters();
                    this.randomCharacter = this.getRandomCharacter(this.store.characters, this.selectedCharacter);
                    if (this.randomCharacter) {
                        this.randomCharacter.maxLife = this.randomCharacter.life;
                    }
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

            await new Promise(resolve => setTimeout(resolve, 3000));

            let turn = 0;

            let attacker, defender;

            if (this.selectedCharacter.speed >= this.randomCharacter.speed) {
                attacker = this.selectedCharacter;
                defender = this.randomCharacter;
            } else {
                attacker = this.randomCharacter;
                defender = this.selectedCharacter;
            }

            while (this.selectedCharacter.life > 0 && this.randomCharacter.life > 0) {
                // Determina attaccante e difensore in base al turno
                this.currentAttacker = attacker;  // Imposta l'attaccante corrente
                this.isAttacking = true;          // Attiva l'animazione di attacco

                // Attendi il tempo dell'animazione prima di infliggere il danno
                await new Promise(resolve => setTimeout(resolve, 500));  // Allineato alla durata dell'animazione

                if (attacker.speed >= defender.speed * 2) {
                    // Primo attacco
                    this.attack(attacker, defender);
                    if (defender.life > 0) {
                        // Aspetta per l'attacco successivo
                        await new Promise(resolve => setTimeout(resolve, 500));

                        this.isAttacking = false;
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        this.isAttacking = true;
                        await new Promise(resolve => setTimeout(resolve, 500));
                        // Secondo attacco
                        this.attack(attacker, defender);
                    }
                } else {
                    // Attacca una sola volta
                    this.attack(attacker, defender);
                }

                await new Promise(resolve => setTimeout(resolve, 500));


                this.isAttacking = false;  // Disattiva l'animazione

                if (defender.life > 0) {
                    [attacker, defender] = [defender, attacker];  // Scambia l'attaccante e il difensore
                }

                await new Promise(resolve => setTimeout(resolve, 500));

                if (this.selectedCharacter.life <= 0) {
                    this.selectedCharacter.isDefeated = true;  // Aggiungi lo stato di sconfitta
                    break;  // Termina il combattimento
                } else if (this.randomCharacter.life <= 0) {
                    this.randomCharacter.isDefeated = true;  // Aggiungi lo stato di sconfitta
                    break;  // Termina il combattimento
                }


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
            const damage = (attacker.strength + attacker.intelligence) - defender.defense;
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
    <section class="mt-5">
        <h1 class="text-white text-center"><span :class="`text-${selectedCharacter?.type.name.toLowerCase()}`">{{
            selectedCharacter.name }}</span>
            VS <span :class="`text-${randomCharacter?.type.name.toLowerCase()}`">{{ randomCharacter.name }}</span>
        </h1>
        <div class="wrapper-life d-flex justify-content-around">
            <div class="life-bar p-3 w-100 mx-3 position-relative">
                <div class="life-fill-selected position-absolute h-100 border-1"
                    :class="lifeBarClass(selectedCharacter?.life)"
                    :style="{ width: `${(selectedCharacter?.life / selectedCharacter?.maxLife) * 100}%` }">
                    <span v-if="selectedCharacter?.life != 0">{{ selectedCharacter?.life }}</span>
                </div>
            </div>
            <div class="life-bar p-3 mx-3 w-100 position-relative">
                <div class="life-fill-random position-absolute h-100 border-1"
                    :class="lifeBarClass(randomCharacter?.life)"
                    :style="{ width: `${(randomCharacter?.life / randomCharacter?.maxLife) * 100}%` }">
                    {{ randomCharacter?.life }}</div>
            </div>
        </div>
        <div class="fight-page">
            <div class="fight-arena d-flex justify-content-center align-items-center">
                <!-- Personaggio selezionato -->
                <div v-if="selectedCharacter" class="character selected"
                    :class="{ 'character-attack-left': isAttacking && currentAttacker === selectedCharacter }">
                    <!-- <h2 :class="`text-${selectedCharacter?.type.name.toLowerCase()}`">{{ selectedCharacter?.name }}</h2> -->

                    <img :src="`${store.baseUrl}${selectedCharacter?.type.image}`" alt="">
                </div>

                <!-- Personaggio casuale -->
                <div v-if="randomCharacter" class="character"
                    :class="{ 'character-attack-right': isAttacking && currentAttacker === randomCharacter }">
                    <!-- <h2 :class="`text-${randomCharacter?.type.name.toLowerCase()}`">{{ randomCharacter?.name }}</h2> -->

                    <img :src="`${store.baseUrl}${randomCharacter?.type.image}`" alt="">
                </div>
            </div>

            <!-- Risultato del combattimento -->
            <div class="fight-result mt-4">
                <h2 class="text-white">{{ fightResult }}</h2>
            </div>
        </div>
    </section>
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
    transition: transform 0.5s ease-in-out; // Aggiungi transizione per l'attacco
}

.character img {
    width: 100%;
    border-radius: 10px;
}

.character.selected img {
    transform: scaleX(-1); // Specchia solo il personaggio selezionato
}

/* Animazione per l'attacco del personaggio selezionato (da sinistra a destra) */
.character-attack-left {
    transform: translateX(100px); // Muovi il personaggio selezionato verso destra (attacco)
}

/* Animazione per l'attacco del personaggio casuale (da destra a sinistra) */
.character-attack-right {
    transform: translateX(-100px); // Muovi il personaggio casuale verso sinistra (attacco)
}

h1 {
    max-width: 800px;
    margin: 0 auto;
}

.wrapper-life {
    margin: 0 auto;
    width: 100%;
    max-width: 800px;
}

.life-bar {
    max-width: 45%;
    height: 20px;
    border-radius: 5px;
    margin-top: 10px;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #9b9d9e;
}

.life-fill-selected {
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    left: 0;
    border-radius: 5px;
    transition: width 0.5s ease;
}

.life-fill-random {
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 0;
    border-radius: 5px;
    transition: width 0.5s ease;
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