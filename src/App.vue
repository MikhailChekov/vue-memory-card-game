<template>
    <div class="wrapper">
        <div class="container">
            <h1 class="h1">Vue memory js game</h1>
            <Start v-if="isStart" @start="startGame" />
            <Game 
                v-else-if="isGame"
                @gameOver="startFinish"
                :arr="imgs"
            />
            <Finish :time="gameTime" v-else />
        </div>
    </div>
</template>

<script>

import { DEFCARDS } from './constants';
import Start from './components/start/Start.vue';
import Game from './components/game/Game.vue';
import Finish from './components/finish/Finish.vue'

export default {
    name: 'App',
    components: {
        Start,
        Game,
        Finish
    },
    data: () => ({
        imgs: [],
        imgsCount: null,
        isStart: false,
        isGame: false,
        // for api loading
        //isLoading: false,
        gameTime: null,
    }),
    methods: {
        startGame(count){
            let initialArr = DEFCARDS.slice(0, count);
            // Create deep copy of array for making reactive all same elements
            let copy = initialArr.map(e => ({...e}));
            this.imgs.push(...initialArr, ...copy);

            this.isStart = false;
            this.isGame = true;
        },
        startFinish(gameTime){
            this.isGame = false;
            this.gameTime = gameTime;
            console.log('GameOver' , );
        }
    },
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
}

.h1 {
    color: #dc5b21;
    font: italic 36px Georgia, 'Times New Roman', Times, serif;
}

.container__title {
    margin-bottom: 20px;
}
</style>
