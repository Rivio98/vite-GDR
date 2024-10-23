<script>
import { store } from '../store.js';
import background1 from '../assets/background1.jpg';
import background2 from '../assets/background2.jpg';
import background3 from '../assets/background3.jpg';
import background4 from '../assets/background4.jpg';
import background5 from '../assets/background5.jpg';
import background6 from '../assets/background6.jpg';
import fightMusic from '../assets/fight-music.mp3';  // Add your fight music file here

export default {
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
            enemyDamageDealt: null, // Store the latest damage dealt by the random character
            audio: null // Audio instance
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
                    [attacker, defender] = [defender, attacker];
                }

                await new Promise(resolve => setTimeout(resolve, 500));

                if (this.selectedCharacter.life <= 0) {
                    this.selectedCharacter.isDefeated = true;
                    break;
                } else if (this.randomCharacter.life <= 0) {
                    this.randomCharacter.isDefeated = true;
                    break;
                }

                turn++;
            }

            this.stopFightMusic(); // Stop music on fight result
            if (this.selectedCharacter.life > 0) {
                this.fightResult = `${this.selectedCharacter.name} vince!`;
            } else {
                this.fightResult = `${this.randomCharacter.name} vince!`;
            }
        },

        attack(attacker, defender) {
            const probability_miss = Math.random();
            const probability_crit = Math.random();
            let damage;
            if (probability_miss < 0.2) {
                this.isMissing = true;
                damage = 0; // No damage when missing
            } else {
                if (probability_crit < 0.2) {
                    damage = Math.floor((attacker.strength + attacker.intelligence) * 1.5) - defender.defense;
                } else {
                    damage = (attacker.strength + attacker.intelligence) - defender.defense;
                }
                defender.life -= damage;
                this.damageDealt = damage;  // Update the latest damage dealt by the selected character

                // Simulate random damage for the enemy character
                this.enemyDamageDealt = Math.floor(Math.random() * 10) + 1;
                if (defender === this.randomCharacter) {
                    this.randomCharacter.life -= this.enemyDamageDealt;
                } else {
                    this.selectedCharacter.life -= this.enemyDamageDealt;
                }
            }

            if (defender.life < 0) {
                defender.life = 0;
            }
        },

        playFightMusic() {
            this.audio = new Audio(fightMusic);
            this.audio.loop = true;  // Loop the music
            this.audio.volume = 0.1; // Set fixed volume to 10%
            this.audio.play().catch(error => console.error("Failed to play music:", error));
        },

        stopFightMusic() {
            if (this.audio) {
                this.audio.pause();
                this.audio.currentTime = 0; // Reset to start
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
};
</script>

<template>
    <section
        :style="{ backgroundImage: `url(${selectedBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        class="fight-page">
        <h1 class="text-white text-center">
            <span v-if="selectedCharacter" :class="`text-${selectedCharacter.type?.name.toLowerCase()}`">{{
                selectedCharacter.name }}</span>
            VS
            <span v-if="randomCharacter" :class="`text-${randomCharacter.type?.name.toLowerCase()}`">{{
                randomCharacter.name }}</span>
        </h1>

        <div class="wrapper-life d-flex justify-content-around">
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
            <div class="fight-result mt-4">
                <h2 class="text-white">{{ fightResult ?? 'In corso...' }}</h2>
                <h3 class="text-white">
                    {{ damageDealt !== null ? `Danno inflitto: ${damageDealt}` : '' }}<br />
                    {{ enemyDamageDealt !== null ? `Danno nemico inflitto: ${enemyDamageDealt}` : '' }}
                </h3>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.fight-page {
    text-align: center;
    margin-top: 30px;
}

.fight-arena {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 20px;
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
    transform: translateX(-100px);
}

.wrapper-life {
    margin: 0 auto;
    width: 100%;
    max-width: 800px;
}

.life-bar {
    max-width: 45%;
}

.life-fill-selected {
    background-color: #2ECC71;
}

.life-fill-random {
    background-color: #E74C3C;
}

.life-bar-red {
    background-color: red;
}

.life-bar-yellow {
    background-color: yellow;
}

.life-bar-green {
    background-color: green;
}
</style>
