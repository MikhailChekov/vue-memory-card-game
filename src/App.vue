<template>
    <div class="wrapper">
        <div class="container">
            <h1 class="h1">Vue memory js game</h1>
            <Start v-if="isStart" @start="startGame" @results="showResults" />
            <Game v-else-if="isGame" @back="backToStart" @gameOver="startFinish" :arr="imgs" />
            <Finish v-else-if="isFinish" @save="saveResults" @back="backToStart" :time="gameTime"  />
            <Results  v-else @back="backToStart" :results="results"/>
            <Modal ref="modalRef" />
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { DEFCARDS, DEFRESULTS } from './constants';
import Start from './components/start/Start.vue';
import Game from './components/game/Game.vue';
import Finish from './components/finish/Finish.vue';
import Modal from './components/common/Modal.vue';
import Results from './components/results/Results.vue';

let initialData = function() {
        return {
            imgs: [],
            results: DEFRESULTS,
            imgsCount: null,
            isStart: true,
            isGame: false,
            isFinish: false,
            isResults: false,
            // for api loading
            //isLoading: false,
            gameTime: null,
        }
    };

export default {
    name: 'App',
    components: {
        Start,
        Game,
        Finish,
        Modal,
        Results,
    },
    data: initialData,
    methods: {
        startGame(count) {
            let initialArr = DEFCARDS.slice(0, count);
            // Create deep copy of array for making reactive all same elements
            let copy = initialArr.map(e => ({ ...e }));
            this.imgs.push(...initialArr, ...copy);
            this.imgsCount = count;

            this.isStart = false;
            this.isGame = true;
        },
        startFinish(gameTime) {
            this.isFinish = true;
            this.isGame = false;
            this.gameTime = gameTime;
        },
        saveResults(name) {
            let level;
            switch(this.imgsCount){
                case 6:
                    level = "ease";
                    break;
                case 12:
                    level = "middle";
                    break;
                case 24:
                    level = "middle";
                    break;
            }
            let result = {
                name,
                score: this.gameTime,
            };

            // pass new results to gameFullResults, 
            //gameFullResults watch child component 'Results'
            this.results[level].push(result);
            this.finish = false;
            this.isStart = true;
            /* Show/Close modal after save results */
            this.$refs.modalRef.showModal = true;
            setTimeout(() => {
                this.$refs.modalRef.showModal = false;
            }, 2500);          
        },
        showResults() {
            this.isStart = false;
        },
        backToStart() {
            // erase imgs
            this.$set(this.imgs.splice(0));
            this.imgs = [],
            this.imgsCount = null;
            this.isStart = true;
            this.isGame = false;
            this.isFinish = false;
            this.isResults = false;
            this.gameTime = null;
            this.gameFullResults = null;
        },
    },
};
</script>

<style lang="scss">
*,
*:before,
*:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

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

.button {
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    padding: 11px 32px;
    border: solid 1px #004f72;
    -webkit-border-radius: 17px;
    -moz-border-radius: 17px;
    border-radius: 17px;
    font-size: 20px;
    font-weight: bold;
    color: #e5ffff;
    background-color: #70ab8f;
    background-image: -moz-linear-gradient(top, #70ab8f 0%, #145235 100%);
    background-image: -webkit-linear-gradient(top, #70ab8f 0%, #145235 100%);
    background-image: -o-linear-gradient(top, #70ab8f 0%, #145235 100%);
    background-image: -ms-linear-gradient(top, #70ab8f 0%, #145235 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#145235', endColorstr='#145235',GradientType=0 );
    background-image: linear-gradient(top, #70ab8f 0%, #145235 100%);
    -webkit-box-shadow: 0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;
    -moz-box-shadow: 0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;
    box-shadow: 0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;
    filter: dropshadow(color=#bababa, offx=-2, offy=0);
}
</style>
