<template>
    <div class="start">
        <div class="start__body">
            <div class="count">
                <p>Choose card count:</p>
                <input type="radio" id="count_1" value="6" v-model="count">
                <label for="count_1">12</label>
                <input type="radio" id="count_2" value="10" v-model="count">
                <label for="count_2">20</label>
                <input type="radio" id="count_3" value="18" v-model="count">
                <label for="count_3">36</label>
            </div>
            <!-- 
            <p>Choose themes picture for frontside card:</p>
            <p>Choose themes picture for backside card:</p>
            <select v-model="theme">
                <option>Flags</option>
                <option>Sport</option>
                <option>Cars</option>
                <option>Famous</option>
                <option>Buildings</option>
            </select>
            <p>Theme: {{ theme }}</p> -->
            <button class="button" @click="start">Start</button>
            <button class="button" @click="$emit('results')">Results</button>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            // theme: 'Flags',
            count: 6
        };
    },
    methods: {
        start(){
            this.$emit('start', this.count);
        }
    }
};
</script>

<style lang="scss" scoped>
.start__body {
    font-size: 24px;
}
.count{
    margin-bottom: 30px;
    label{
        cursor: pointer;
    }
}

select {
    font-size: 18px;
    width: 100px;
    text-align-last: center;
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
    text-shadow: -2px 0px 0px #bababa;
    filter: dropshadow(color=#bababa, offx=-2, offy=0);
}
</style>
