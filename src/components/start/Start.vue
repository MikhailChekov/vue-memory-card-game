<template>
    <div class="start">
        <div class="start__body">
            <div class="theme">
                <h4>Theme samples:</h4>
                    <div class="theme__field">
                        <div
                        v-for="(card, i) in filteredTheme"
                        :key="i"
                        :style="{ 'background-image': `url(${card.src})` }"
                        class="theme__card"
                    ></div>
                </div>
            </div>
            <div class="theme_input">
                <Input @search="search" ref="inputThemeRef"/>
            </div>
            <button v-if="!isDefault" class="button_info" @click="$emit('backToDefault')">Back to default theme</button>
            <div class="error">{{ error }}</div>
            <div class="count">
                <h4>Choose card count:</h4>
                <input type="radio" id="count_1" value="6" v-model="count">
                <label for="count_1">12</label>
                <input type="radio" id="count_2" value="10" v-model="count">
                <label for="count_2">20</label>
                <input type="radio" id="count_3" value="18" v-model="count">
                <label for="count_3">36</label>
            </div>
            <button class="button" @click="$emit('start', count)">Start</button>
            <button class="button" @click="$emit('results')">Results</button>
        </div>
    </div>
</template>

<script>
import Input from './Input';

export default {
    components: { Input },
    props: ['theme', 'isDefault'],
    data: () => {
        return {
            // theme: 'Flags',
            count: 6,
            error: '',
        };
    },
    methods: {
        //pass the search to App
        search(query){
            this.$emit('search', query)
        }
    },
    computed: {
        //limit the theme photos to 5
        filteredTheme(){
            return this.theme.slice(0, 5);
        }
    }
};
</script>

<style lang="scss" scoped>
.theme_input{
    display: flex;
    align-items: center;
    justify-content: center;
}
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
.theme{
    margin: 0 auto 20px auto; 
    width: 550px;
    .theme__field {
        display: flex;
        flex: 0 0 100px;
    }
    .theme__card {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 10px;
        margin: 5px;
        overflow: hidden; 
        transform: perspective(600px) rotateY(180deg);
        flex-direction: column;
        background-size: cover;
    }
    .error {
        font-size: 14px;
        color: red;
    }
}
.theme_input{
    margin-bottom: 20px;
}
</style>
