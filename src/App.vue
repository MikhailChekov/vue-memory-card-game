<template>
    <div class="wrapper">
        <div class="container">
            <h1 class="h1">Vue memory js game</h1>
            <Start v-if="isStart" @start="startGame" />
            <Game 
                v-else-if="isGame"
                :arr="imgs"
            />
            <h1 class="h1" v-else>Какая-то хрень пошла не так!</h1>
        </div>
    </div>
</template>

<script>

import Start from './components/start/Start.vue';
import Game from './components/game/Game.vue';
import { DEFCARDS } from './constants';

export default {
    name: 'App',
    components: {
        Start,
        Game
    },
    data: () => ({
        isStart: false,
        // for api loading
        //isLoading: false,
        isGame: true,
        imgs: DEFCARDS
    }),
    methods: {
        startGame(){
            for(let i = 1; i <= 18; i++){
                this.imgs.push(`./assets/img/nature/${i}.jpeg`)
            }
            this.isStart = false;
            this.isGame = true;

            console.log(this.imgs);
        }
    }
}
</script>

<style lang="scss">
$mw: 970px;

body {
    background-color: #e4dbbf;
}

.wrapper {
    width: 100%;
    min-height: 100%;
    overflow: hidden;
}
.container {
    max-width: $mw;
    margin: 0 auto;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    padding-top: 50px;
}

.h1 {
    color: #dc5b21;
    font: italic 36px Georgia, 'Times New Roman', Times, serif;
}

.container__title {
    margin-bottom: 20px;
}
</style>
