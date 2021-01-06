<template>
    <div class="gameField">
        <div v-for="(card, i) in cards" :key="i" class="card" :class="{ open: card.isOpen, hidden: card.isHidden }" @click="handleClick(i)">
            <div class="card__front"></div>
            <div class="card__back" :style="{ 'background-image': `url(${card.src})` }"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['arr'],
    data() {
        return {
            // copy cards from props and sort it
            cards: [...this.arr.concat()].sort(function() {
                return Math.random() - 0.5;
            }),
            openIndex: null,
            isTwoOpen: false,
        };
    },
    methods: {
        handleClick(i) {
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
                console.log('SAME');
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
    },
};

// this.cards = this.cards.map(e => {
//     if(e.src = this.cards[i].src){
//         return e = {...e, isHidden: true};
//     }
//     return e;
// });
</script>

<style lang="scss" scoped>
.gameField {
    margin: 0 auto;
    width: 700px;
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
