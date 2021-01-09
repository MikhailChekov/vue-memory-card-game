<template>
    <div class="wrapper">
        <div class="container">
            <h1 class="h1">Vue memory js game</h1>
            <Start v-if="isStart" @start="startGame" @results="showResults" />
            <Game 
                v-else-if="isGame"
                @gameOver="startFinish"
                :arr="imgs"
            />
            <Finish @save="saveResults" :time="gameTime" v-else />
            <Results  v-if="isResults" />
            <Modal ref="modal" />
        </div>
    </div>
</template>

<script>

import { DEFCARDS } from './constants';
import Start from './components/start/Start.vue';
import Game from './components/game/Game.vue';
import Finish from './components/finish/Finish.vue';
import Modal from './components/common/Modal.vue'
import Results from './components/results/Results.vue';

export default {
    name: 'App',
    components: {
        Start,
        Game,
        Finish,
        Modal,
        Results
    },
    data: function (){
        return {
            imgs: [],
            imgsCount: null,
            isStart: true,
            isGame: false,
            isResults: false,
            // for api loading
            //isLoading: false,
            gameTime: null,
        }
    },
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
        },
        saveResults(name){
            //TODO: save to store or somewhere else like local storage
            this.isStart = true;
            this.$refs.modal.showModal = true;
            setTimeout(() => {
                this.$refs.modal.showModal = false;
            }, 2500)
        },
        showResults(){
            //TODO: show results
            console.log('results');
        }
    },
}
</script>

<style lang="scss">
*,*:before,*:after{-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;}

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
