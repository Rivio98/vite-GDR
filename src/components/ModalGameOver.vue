<script>
import { store } from '../store.js';
export default {
    props: ['fightResult', 'character'],
    name: 'ModalGameOver',
    data() {
        return {
            store
        }
    },
    methods: {
        reloadPage() {
            window.location.reload(); // Forza il refresh della pagina
        }
    }

}
</script>

<template>
    <div class="d-flex align-items-center justify-content-center min-vh-100">
        <div class="modal fade" id="game-over" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered text-center">
                <div class="modal-content text-bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger text-center w-100">GAME OVER</h5>
                    </div>
                    <div class="modal-body d-flex align-items-center justify-content-center">
                        <p class="m-0">{{ fightResult }} vince!</p>
                    </div>
                    <div class="modal-footer">
                        <button @click="reloadPage" class="btn btn-secondary">Riprova</button>
                        <router-link :to="{ name: 'characters' }" class="btn btn-primary">
                            Cambia personaggio </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal-content {
    min-height: 250px;
}
</style>