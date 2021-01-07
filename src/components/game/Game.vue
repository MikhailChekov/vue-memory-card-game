<template>
    <div>
        <timer ref="timer"></timer>
        <div class="gameField" :style="{width: fieldWidth}">
            <div v-for="(card, i) in cards" :key="i" class="card" :class="{ open: card.isOpen, hidden: card.isHidden }" @click="handleClick(i)">
                <div class="card__front"></div>
                <div class="card__back" :style="{ 'background-image': `url(${card.src})` }"></div>
            </div>
        </div>
    </div>
</template>

<script>

import Timer from './Timer.vue';

export default {
    components: { Timer },
    props: ['arr'],
    data() {
        return {
            // copy cards from props and sort it
            cards: [...this.arr.concat()].sort(function() {
                return Math.random() - 0.5;
            }),
            count: this.arr.length,
            gameTime: null,
            openIndex: null,
            isTwoOpen: false,
        };
    },
    // mounted(){
    //     this.$refs.timer.startTimer()
    // },
    methods: {
        handleClick(i) {
            if(this.isGameOver()) {
                //TODO: not working when gameOver
                this.$refs.timer.stopTimer();
                this.gameTime = this.$refs.timer.currentTime;
                console.log(this.gameTime);
            }

            if (this.cards[i].isOpen) return;
            // if click 2 cards open - close
            if (this.isTwoOpen) this.closeAll();

            //if one active - check 2 card to equal
            if (this.openIndex !== null) {
                this.cards[i].isOpen = true;
                this.checkCards(i);
            } else {
                this.cards[i].isOpen = true;
                this.openIndex = i;
            }
        },
        //check 2 cards and hide if true
        checkCards(i) {
            if (this.cards[this.openIndex].src === this.cards[i].src) {
                let src = this.cards[i].src;
                this.cards = this.cards.map(e => {
                    if(e.src === src){
                        e = {...e, isHidden: true}
                    }
                    return e;
                })
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

        //TODO:
        isGameOver() {
            console.log('gameOVer');

            return this.cards.every(e => { return e.isHidden === true});
        }
    },
    computed: {
        fieldWidth(){
            let fieldWidth = 0;

            switch(this.count){
                case 12: 
                    fieldWidth = 440 + 'px';
                    break;
                case 20:  
                    fieldWidth = 555 + 'px';
                    break;
                case 36:
                    fieldWidth = 660 + 'px';
                }
            return fieldWidth;
        }
    }
};

</script>

<style lang="scss" scoped>
.gameField {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
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
