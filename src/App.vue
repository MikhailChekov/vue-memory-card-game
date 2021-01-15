<template>
    <div class="wrapper">
        <div class="container">
            <h1 v-if="isStart" class="h1">Vue memory js game</h1>
            <Start 
                v-if="isStart"
                @search="searchRequest"
                @start="startGame"
                @results="showResults"
                @backToDefault="backToDefault"
                :theme="theme"
                :loading="isLoading"
                :isDefault="isDefaultTheme"
                ref="startRef"
            />
            <Game 
                v-else-if="isGame" 
                @back="refresh" 
                @gameOver="startFinish" 
                :arr="imgs" 
                ref="gameRef" 
            />
            <Finish 
                v-else-if="isFinish" 
                @save="saveResults" 
                @back="refresh" 
                :time="gameTime" 
            />
            <Results 
                v-else @back="showMain" 
                :results="results" 
            />
            <modal ref="modalRef">Your results have been saved</modal>
        </div>
    </div>
</template>

<script>
import { DEFCARDS, DEFRESULTS } from './constants';
import Start from './components/start/Start.vue';
import Game from './components/game/Game.vue';
import Finish from './components/finish/Finish.vue';
import Modal from './components/common/Modal.vue';
import Results from './components/results/Results.vue';

export default {
    name: 'App',
    components: {
        Start,
        Game,
        Finish,
        Modal,
        Results,
    },
    mounted() {
        // load Results from local storage or include default Results Obj
        if (localStorage.getItem('res')) {
            this.results = JSON.parse(localStorage.getItem('res'));
        } else {
            this.results = DEFRESULTS;
        }
    },
    data() {
        return {
            theme: DEFCARDS,
            imgs: [],
            results: [],
            level: null,
            isStart: true,
            isGame: false,
            isFinish: false,
            isDefaultTheme: true,
            isLoading: false,
            gameTime: null,
        };
    },
    methods: {
        searchRequest(query) {
            this.$refs.startRef.error = '';
            if (query) {
                if(!/^[a-zA-Z0-9\s]+$/.test(query)){
                    this.$refs.startRef.error = 'Please, use english letters...';
                    return;
                }

                this.isLoading = true;

                const URL = 'https://api.unsplash.com/search/photos/';
                const SQUARE = 'orientation=squarish';
                const KEY = process.env.VUE_IMAGE_API_ACESS;
                const FULLURL = `${URL}?&query=${query}&client_id=${KEY}&count=18&page=1&per_page=18&${SQUARE}`;
                const FULLURL2 = `${URL}?&query=${query}&client_id=${KEY}&count=18&page=1&per_page=18`;

                fetch(FULLURL)
                    .then(response => response.json())
                    .then(json => {
                        if (json.results.length > 17) {
                            this.theme = this.theme.map((e, i) => {
                                return { ...e, src: json.results[i].urls.regular };
                            });
                            this.isDefaultTheme = false;
                            this.isLoading = false;
                        } else {
                            fetch(FULLURL2)
                                .then(response => response.json())
                                .then(json => {
                                    if (json.results.length > 17) {
                                        this.theme = this.theme.map((e, i) => {
                                            return { ...e, src: json.results[i].urls.regular };
                                        })
                                        this.isDefaultTheme = false;
                                    } else {
                                        
                                        this.$refs.startRef.error = 'Not enough photo for the game, please choose another theme...'
                                    }

                                    this.isLoading = false;
                                })
                                .catch(rej=> {
                                    this.$refs.startRef.error = 'Oops, something go wrong, try another time...'
                                })
                        }
                    });
            } else {
                this.$refs.startRef.error = 'Please, fill the theme';
            }
        },
        startGame(count) {
            let initialArr = this.theme.slice(0, count);
            // Create deep copy of array for making reactive all same elements
            let copy = initialArr.map(e => ({ ...e }));
            this.imgs.push(...initialArr, ...copy);

            count = Number(count);
            switch (count) {
                case 6:
                    this.level = 'ease';
                    break;
                case 10:
                    this.level = 'middle';
                    break;
                case 18:
                    this.level = 'hard';
                    break;
            }

            this.isStart = false;
            this.isGame = true;
        },
        startFinish(gameTime) {
            this.isFinish = true;
            this.isGame = false;
            this.gameTime = gameTime;
        },
        saveResults(name) {
            //prepare results data
            let result = {
                name,
                score: this.gameTime,
            };
            //save results to state
            this.results[this.level].push(result);
            //sort results and delete last element if more than 10
            for(let level in this.results){
                this.results[level].sort((a, b) => a.score - b.score)
                if(this.results[level].length > 10){
                    this.results[level].pop();
                }
            }

            //save results to local storage
            const parsed = JSON.stringify(this.results);
            localStorage.setItem('res', parsed);

            /* Show/Close modal after save results */
            this.$refs.modalRef.showModal = true;
            setTimeout(() => {
                this.$refs.modalRef.showModal = false;
                this.showMain();
                window.location.reload();
            }, 1500);
        },
        showResults() {
            this.isStart = false;
        },
        showMain() {
            this.isStart = true;
            this.isFinish = false;
        },
        backToDefault() {
            this.theme = DEFCARDS;
            this.isDefaultTheme = true;
        },
        refresh() {
            window.location.reload();
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

.error {
    font-size: 18px;
    color: red;
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
    @media (max-width: 400px) {
        padding-left: 5px;
        padding-right: 5px;
    }
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
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
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
.button_info {
    background-color: #4d59e1;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    padding: 11px 32px;
    border: solid 1px #004f72;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
    font-size: 20px;
    font-weight: bold;
    color: #e5ffff;
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#145235', endColorstr='#145235',GradientType=0 );
    -webkit-box-shadow: 0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;
    -moz-box-shadow: 0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;
    box-shadow: 0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;
    filter: dropshadow(color=#bababa, offx=-2, offy=0);
}
</style>
