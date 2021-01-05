<template>
    <div class="gameField">
        <div v-for="(card, i) in cards" :key="i" class="card" :class="{ active: card.isActive }" @click="toggleActive(i)">
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
            isSomeActive: false,
            // TODO: implement check for 2 open cards and stop action
            isTwoOpen: false
        }
    },
    methods: {
        toggleActive(i) {
            // if click to active card - return
            if (this.cards[i].isActive) return;

            //if some active - check 2 card to equal
            if (this.isSomeActive) {
                this.cards[i].isActive = true;
                this.checkCards(i)
            }else{
                this.cards[i].isActive = true;
                this.isSomeActive = true;
            }


        },
        //check 2 cards and hide if true
        checkCards(i){
            this.isSomeActive = false;

            if(this.cards.filter(e => e.isActive).src === this.cards[i].src) {
                console.log('Same one!');
                this.cards = this.cards.map(e => {
                    return {...e, isActive: false }
                });
                this.isOpen = false
            } else{
                console.log('not the same');
                setTimeout(() => {
                    this.cards = this.cards.map(e => {
                        return {...e, isActive: false }
                    });
                    this.isOpen = false
                }, 1500)
            }
        }
    }
};
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
    // flex: 1 1 15%;
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

    &.active {
        .card__front {
            transform: perspective(600px) rotateY(-180deg);
        }

        .card__back {
            transform: perspective(600px) rotateY(0);
        }
    }
}
</style>
