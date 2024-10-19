<script>
export default {
    name: 'PageNoTFound',

}
</script>
<template>
    <section class="d-flex justify-content-center align-items-center">
        <div class="text-center">
            <h1 class="text-warning">404 - Pagina Non Trovata</h1>
            <p class="text-white">La pagina che stai cercando non esiste.</p>
            <router-link to="/">Torna alla Home</router-link>
        </div>
    </section>
</template>
<style lang="scss" scoped>
a {
    text-decoration: underline;
}
</style>