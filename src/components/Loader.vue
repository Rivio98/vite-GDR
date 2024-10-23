<script>
export default {
    name: 'Loader',

}
</script>

<template>
    <section class="d-flex justify-content-center align-items-center">

        <div class="loader">

            <div id="block_01" class="block active"></div>
            <div id="block_02" class="block active"></div>
            <div id="block_03" class="block active"></div>
            <div id="block_04" class="block active"></div>

            <div id="block_0a" class="block active"></div>


            <div id="block_05" class="block"></div>
            <div id="block_06" class="block"></div>
            <div id="block_07" class="block"></div>
            <div id="block_08" class="block"></div>

            <div id="block_0b" class="block"></div>


            <div id="block_09" class="block"></div>
            <div id="block_10" class="block"></div>
            <div id="block_11" class="block"></div>
            <div id="block_12" class="block"></div>

            <div id="block_0c" class="block"></div>


            <div id="block_13" class="block"></div>
            <div id="block_14" class="block"></div>
            <div id="block_15" class="block"></div>
            <div id="block_16" class="block"></div>

            <div id="block_0d" class="block active"></div>

        </div>

    </section>
</template>

<style lang="scss" scoped>
.loader {

    position: relative;
    width: 80px;
    height: 80px;
    animation: spin 2s steps(1) infinite;
    box-sizing: border-box;
}

.block {
    position: absolute;
    background: #f0f0f0;
    width: 10px;
    height: 10px;
}

.active {
    background: #FE6D17;
}


#block_01 {
    top: 0px;
    left: 20px
}

#block_02 {
    top: 0px;
    left: 30px
}

#block_03 {
    top: 0px;
    left: 40px
}

#block_04 {
    top: 0px;
    left: 50px
}


#block_0a {
    top: 10px;
    left: 60px
}


#block_05 {
    top: 20px;
    left: 70px
}

#block_06 {
    top: 30px;
    left: 70px
}

#block_07 {
    top: 40px;
    left: 70px
}

#block_08 {
    top: 50px;
    left: 70px
}


#block_0b {
    top: 60px;
    left: 60px
}


#block_09 {
    top: 70px;
    left: 50px
}

#block_10 {
    top: 70px;
    left: 40px
}

#block_11 {
    top: 70px;
    left: 30px
}

#block_12 {
    top: 70px;
    left: 20px
}


#block_0c {
    top: 60px;
    left: 10px
}


#block_13 {
    top: 20px;
    left: 0px
}

#block_14 {
    top: 30px;
    left: 0px
}

#block_15 {
    top: 40px;
    left: 0px
}

#block_16 {
    top: 50px;
    left: 0px
}


#block_0d {
    top: 10px;
    left: 10px
}


.block_highlight {
    background: green;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(90deg);
    }

    50% {
        transform: rotate(180deg);
    }

    75% {
        transform: rotate(270deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>