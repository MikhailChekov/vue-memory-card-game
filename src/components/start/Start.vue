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


</style>
