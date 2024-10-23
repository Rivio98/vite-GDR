<script>
export default {
    name: 'PageHome',
    mounted() {
        this.playMusic();
    },
    beforeDestroy() {
        this.stopMusic();
    },
    methods: {
        playMusic() {
            const audio = document.getElementById('background-music');
            audio.volume = 0.3;
            audio.play();
        },
        stopMusic() {
            const audio = document.getElementById('background-music');
            audio.pause();
            audio.currentTime = 0; // Riavvolgi il brano
        }
    }
}
</script>
<template>
    <div class="container">
        <audio id="background-music" loop>
            <source src="../assets/home.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <div class="row">
            <div class="col-12">
                <div class="content text-center my-2" id="home">
                    <div>
                        <h1>Pixel GDR World</h1>
                        <p>Immergiti nel nostro fantastico mondo in pixel art</p>
                        <div>
                            <router-link :to="{ name: 'characters' }" class="btn-start">Inizia</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables/colorText' as *;

#home {
    color: #ffffff;
    height: calc(100vh - 60px);
    background-image: url('../assets/PixelArtBackground.gif');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
        color: $color_text;
    }

    .btn-start {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #57c7f2;
        color: #1d1d1d;
        text-transform: uppercase;
        font-weight: bold;
        border-radius: 8px;
        box-shadow: 2px 2px 0 #111;
        transition: 0.3s ease;
    }

    .btn-start:hover {
        background-color: #f25757;
        transform: translateY(-3px);
    }
}
</style>
