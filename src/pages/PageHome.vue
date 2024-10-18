<script>
export default {
    name: 'PageHome',

}
</script>
<template>
    <div class="container">
        <div id="home">
            <div class="row">
                <div class="col-12">
                    <h1 class="text-center">Pixel GDR World</h1>
                    <p class="text-center">Immergiti nel nostro fantastico mondo in pixel art</p>
                    <div class="text-center">
                        <router-link :to="{ name: 'characters' }" class="btn-start">Inizia
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#home {
    text-align: center;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 60px);
    background-image: url('../assets/PixelArtBackground.gif');
    background-size: cover;


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