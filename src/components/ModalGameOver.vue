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
        },
        closeModalAndRedirect() {
            // Nascondi la modale
            const modalElement = document.getElementById('game-over');
            const modal = bootstrap.Modal.getInstance(modalElement); // Ottieni l'istanza della modale
            if (modal) {
                modal.hide(); // Chiudi la modale
            }

            // Reindirizza alla pagina dei personaggi
            this.$router.push({ name: 'characters' });
        }
    }

}
</script>

<template>
    <div class="d-flex align-items-center justify-content-center min-vh-100">
        <div class="modal fade" id="game-over" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true"
            data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered text-center">
                <div class="modal-content text-bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger text-center w-100">GAME OVER</h5>
                    </div>
                    <div class="modal-body d-flex align-items-center justify-content-center">
                        <p class="m-0">{{ fightResult }} vince!</p>
                    </div>
                    <div class="modal-footer">
                        <button @click="reloadPage" class="btn btn-primary">Riprova</button>
                        <button @click="closeModalAndRedirect" class="btn btn-secondary">
                            Cambia personaggio
                        </button>
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