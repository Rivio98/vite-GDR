<script>
import { store } from '../store.js';

import background1 from '../assets/background1.jpg';
import background2 from '../assets/background2.jpg';
import background3 from '../assets/background3.jpg';
import background4 from '../assets/background4.jpg';
import background5 from '../assets/background5.jpg';
import background6 from '../assets/background6.jpg';
import fightMusic from '../assets/fight-music.mp3';  // Add your fight music file here

import ModalGameOver from '../components/ModalGameOver.vue';
import Loader from '../components/Loader.vue';



export default {
    name: 'PageFight',
    components: {
        ModalGameOver,
        Loader,
    },

    data() {
        return {
            randomCharacter: null,
            selectedCharacter: null,
            store,
            fightResult: null,
            isAttacking: false,
            currentAttacker: null,
            isMissing: false,
            selectedBackground: '',
            backgrounds: [
                background1,
                background2,
                background3,
                background4,
                background5,
                background6
            ],
            damageDealt: null, // Store the latest damage dealt by the selected character
            audio: null, // Audio instance
            isMusicPlaying: false, // Stato per sapere se la musica è attiva
        };
    },

    async created() {
        const slug = this.$route.params.slug;
        await this.loadSelectedCharacters(slug);
        this.playFightMusic();  // Start the fight music
    },

    beforeDestroy() {
        this.stopFightMusic();  // Stop music when leaving the page
    },

    beforeRouteLeave(to, from, next) {
        this.stopFightMusic();  // Ferma la musica quando cambi rotta
        next();  // Continua con il cambio di rotta
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

                    this.getRandomBackground();
                    this.startFight();
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

        getRandomBackground() {
            const randomIndex = Math.floor(Math.random() * this.backgrounds.length);
            this.selectedBackground = this.backgrounds[randomIndex];
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
                this.currentAttacker = attacker;
                this.isAttacking = true;
                await new Promise(resolve => setTimeout(resolve, 500));

                if (attacker.speed >= defender.speed * 2) {
                    this.attack(attacker, defender);
                    if (defender.life > 0) {
                        await new Promise(resolve => setTimeout(resolve, 500));
                        this.isAttacking = false;
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        this.isAttacking = true;
                        await new Promise(resolve => setTimeout(resolve, 500));
                        this.attack(attacker, defender);
                    }
                } else {
                    this.attack(attacker, defender);
                }

                await new Promise(resolve => setTimeout(resolve, 500));
                this.isAttacking = false;

                if (defender.life > 0) {
                    [attacker, defender] = [defender, attacker];  // Scambia l'attaccante e il difensore
                    await new Promise(resolve => setTimeout(resolve, 500));
                } else {
                    break;
                }
            }

            turn++;

            // Ferma la musica quando il combattimento è finito
            this.stopFightMusic();

            // Solo dopo che il combattimento è davvero finito, mostra il risultato
            if (this.selectedCharacter.life > 0) {
                this.fightResult = this.selectedCharacter.name;
            } else {
                this.fightResult = this.randomCharacter.name;
            }

            const successModal = new bootstrap.Modal(document.getElementById('game-over'));
            successModal.show();
            // Mostra la modale di successo
        },

        attack(attacker, defender) {
            const probability_miss = Math.random();
            const probability_crit = Math.random();
            let damage;
            if (probability_miss < 0.2) {
                damage = 0; // No damage when missing
            } else {
                if (probability_crit < 0.2) {
                    damage = Math.floor((attacker.strength + attacker.intelligence) * 1.5) - defender.defense;
                } else {
                    damage = (attacker.strength + attacker.intelligence) - defender.defense;
                }
                if (damage < 0) {
                    damage = 0;
                }
                defender.life -= damage;
            }
            this.damageDealt = damage;  // Update the latest damage dealt by the selected character

            if (defender.life < 0) {
                defender.life = 0;
            }
        },

        playFightMusic() {
            // Verifica se l'audio è già in riproduzione
            if (!this.audio) {
                this.audio = new Audio(fightMusic);
                this.audio.loop = true;
                this.audio.volume = 0; // Imposta il volume a 0 inizialmente
                this.audio.play().then(() => {
                    // Dopo aver iniziato la musica, aumenta gradualmente il volume
                    setTimeout(() => {
                        this.audio.volume = 0.1; // Imposta il volume desiderato
                        this.isMusicPlaying = true;
                    }, 500);  // Aumenta il volume dopo 500 ms
                }).catch(error => {
                    console.error("Autoplay bloccato dal browser:", error);
                });
            }
        },

        stopFightMusic() {
            if (this.audio) {
                this.audio.pause();
                this.audio.currentTime = 0; // Reset to start
                this.audio = null;
                this.isMusicPlaying = false;
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

        }
    }

}


</script>

<template>
    <Loader v-if="store.loading" />
    <section v-else
        :style="{ backgroundImage: `url(${selectedBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        class="fight-page overflow-hidden d-flex justify-content-center align-items-center position-relative">
        <div>
            <div class="title text-center w-100 position-absolute top-0 start-0 end-0 text-white bg-darker py-4">
                <h1 class=""><span :class="`text-${selectedCharacter?.type.name.toLowerCase()}`">{{
                    selectedCharacter.name }}</span>
                    VS <span :class="`text-${randomCharacter?.type.name.toLowerCase()}`">{{ randomCharacter.name
                        }}</span>
                </h1>
                <div class="wrapper-life d-flex justify-content-around m3-5">
                    <div class="life-bar p-3 w-100 mx-3 position-relative">
                        <div class="life-fill-selected position-absolute h-100 border-1"
                            :class="lifeBarClass(selectedCharacter?.life)"
                            :style="{ width: `${(selectedCharacter?.life / selectedCharacter?.maxLife) * 100}%` }">
                            <span v-if="selectedCharacter?.life !== 0">{{ selectedCharacter?.life }}</span>
                        </div>
                    </div>
                    <div class="life-bar p-3 mx-3 w-100 position-relative">
                        <div class="life-fill-random position-absolute h-100 border-1"
                            :class="lifeBarClass(randomCharacter?.life)"
                            :style="{ width: `${(randomCharacter?.life / randomCharacter?.maxLife) * 100}%` }">
                            <span v-if="randomCharacter?.life !== 0">{{ randomCharacter?.life }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="fight-page">
                <div class="fight-arena d-flex justify-content-center align-items-center">
                    <div v-if="selectedCharacter" class="character selected"
                        :class="{ 'character-attack-left': isAttacking && currentAttacker === selectedCharacter, 'dodging-left': isMissing }">
                        <img :src="`${store.baseUrl}${selectedCharacter?.type.image}`" alt="">
                    </div>

                    <div v-if="randomCharacter" class="character"
                        :class="{ 'character-attack-right': isAttacking && currentAttacker === randomCharacter, 'dodging-right': isMissing }">
                        <img :src="`${store.baseUrl}${randomCharacter?.type.image}`" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div v-if="damageDealt !== null"
            class="fight-result bg-darker text-white w-50 position-absolute bottom-0 rounded-4 rounded-bottom-0 p-3">
            <h3>
                {{ damageDealt === 0 ? 'MISS!' : `Danni inflitti: ${damageDealt}` }}<br><br>
            </h3>
        </div>
        <ModalGameOver :fightResult="fightResult" :character="store.character" />
    </section>
</template>

<style lang="scss" scoped>
@use '../styles/variables/color_classes' as *;

.bg-darker {
    background-color: #212529b6;
}

.fight-page {
    text-align: center;
}

.title.position-absolute {
    top: 80px;
}

.character {
    width: 200px;
    transition: transform 0.5s ease-in-out;
}

.character img {
    width: 100%;
    border-radius: 10px;
}

.character.selected img {
    transform: scaleX(-1);
}

.character-attack-left {
    transform: translateX(100px);
}

.character-attack-right {
    transform: translateX(-100px); // Muovi il personaggio casuale verso sinistra (attacco)
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
    color: black;
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
