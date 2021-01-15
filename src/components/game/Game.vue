<template>
    <div>
        <timer ref="timer"></timer>
         
        <div class="gameField" :style="{ width: gameSizings.fieldWidth }">
            <div
                v-for="(card, i) in cards"
                :key="i"
                class="card"
                :style="{ width: gameSizings.cardSize , height: gameSizings.cardSize }"
                :class="{ open: card.isOpen, hidden: card.isHidden }"
                @click="handleClick(i)"
            >
                <div class="card__front"></div>
                <div class="card__back" :style="{ 'background-image': `url(${card.src})` }"></div>
            </div>
        </div>
        <button @click="backToMain" class="button">На главную</button>
    </div>
</template>

<script>
import Timer from './Timer.vue';

export default {
    components: { Timer },
    props: ['arr'],
    data() {
        return initialData();
    },
    data: function() {
        return {
            // copy cards from props and sort it
            cards: [...this.arr.concat()].sort(function() {
                return Math.random() - 0.5;
            }),
            gameTime: null,
            openIndex: null,
            isTwoOpen: false,
        };
    },
    methods: {
        handleClick(i) {
            // click to open card - return;
            if (this.cards[i].isOpen) return;
            // if click 2 cards open - close
            if (this.isTwoOpen) this.closeAll();

            //Check for 1 card active
            if (this.openIndex !== null) {
                this.cards[i].isOpen = true;
                this.hidePair(i);
            } else {
                this.cards[i].isOpen = true;
                this.openIndex = i;
            }
        },
        //check 2 cards and hide if true
        hidePair(i) {
            if (this.cards[this.openIndex].src === this.cards[i].src) {
                let src = this.cards[i].src;
                this.cards = this.cards.map(e => {
                    if (e.src === src) {
                        e = { ...e, isHidden: true };
                    }
                    return e;
                });
                // check for GameOver when Data is Changed
                if (this.isGameOver()) {
                    this.gameOver();
                }
            }
            this.isTwoOpen = true;
        },
        // close all open cards
        closeAll() {
            this.openIndex = null;
            this.isTwoOpen = false;
            this.cards = this.cards.map(e => {
                return { ...e, isOpen: false };
            });
        },
        isGameOver() {
            return this.cards.every(e => {
                return e.isHidden === true;
            });
        },
        //finish the game and start saving results
        gameOver(gameTime) {
            this.$refs.timer.stopTimer();
            this.gameTime = this.$refs.timer.currentTime;
            this.$emit('gameOver', this.gameTime);
        },
        backToMain() {
            window.location.reload();
        },
    },
    computed: {
        gameSizings() {
            let width = window.innerWidth;
            let gameSizings = {
                fieldWidth: 0,
                cardSize: 0
            }
            //Adaptive cards for some displays and cards count
            switch (this.arr.length) {
                case 12:
                    if(width < 970 && width > 770){
                        // 770 Max
                        gameSizings.fieldWidth = 770 + 'px';
                        gameSizings.cardSize = 173 + 'px';
                    } else if(window.innerWidth < 771 && width > 479){
                        // 480 Max
                        gameSizings.fieldWidth = 480 + 'px';
                        gameSizings.cardSize = 140 + 'px'; 
                    } else if(width < 479){
                        // Small 
                        gameSizings.fieldWidth = 320 + 'px';
                        gameSizings.cardSize = 88 + 'px'; 
                    } else {
                        //Large
                        gameSizings.fieldWidth = 970 + 'px';
                        gameSizings.cardSize = 227 + 'px'; 
                    }
                    break;
                case 20:
                    if(width < 970 && width > 770){
                        // 770 Max
                        gameSizings.fieldWidth = 770 + 'px';
                        gameSizings.cardSize = 173 + 'px';
                    } else if(window.innerWidth < 771 && width > 479){
                        // 480 Max
                        gameSizings.fieldWidth = 480 + 'px';
                        gameSizings.cardSize = 102 + 'px'; 
                    } else if(width < 479){
                        // Small 
                        gameSizings.fieldWidth = 320 + 'px';
                        gameSizings.cardSize = 63 + 'px'; 
                    } else {
                        //Large
                        gameSizings.fieldWidth = 970 + 'px';
                        gameSizings.cardSize = 180 + 'px';
                    }
                    break;
                case 36:
                    if(width < 970 && width > 770){
                        // 770 Max
                        gameSizings.fieldWidth = 770 + 'px';
                        gameSizings.cardSize = 173 + 'px';
                    } else if(window.innerWidth < 771 && width > 479){
                        // 480 Max
                        gameSizings.fieldWidth = 480 + 'px';
                        gameSizings.cardSize = 102 + 'px'; 
                    } else if(width < 480){
                        // Small 
                        gameSizings.fieldWidth = 320 + 'px';
                        gameSizings.cardSize = 63 + 'px'; 
                    } else {
                        //Large
                        gameSizings.fieldWidth = 900 + 'px';
                        gameSizings.cardSize = 140 + 'px';
                    }
            }



            return gameSizings;
        },
    }
};
</script>

<style lang="scss" scoped>
.gameField {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    margin-bottom: 20px;
    @media (max-width: 770px) {
        justify-content: space-around;
    }
}
.card {
    position: relative;
    width: 100px;
    height: 100px;
    cursor: pointer;
    margin: 5px;

    &__front,
    &__back {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        backface-visibility: hidden;
        transition: 0.5s ease;
        background: linear-gradient(#d6d6d6, #f2f2f2);
    }
    // .card__front
    &__front {
        transform: perspective(600px) rotateY(0);
    }

    // .card__back
    &__back {
        transform: perspective(600px) rotateY(180deg);
        flex-direction: column;
        background-size: cover;
    }

    // .card__descr

    &.open {
        .card__front {
            transform: perspective(600px) rotateY(-180deg);
        }

        .card__back {
            transform: perspective(600px) rotateY(0);
        }
    }
    &.hidden {
        visibility: hidden;
    }
}
</style>
