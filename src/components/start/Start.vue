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
                <Input @search="search" :loading="loading" ref="inputThemeRef"/>
            </div>
            <button v-if="!isDefault" class="button_info" @click="backToDefault">Back to default theme</button>
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
    props: ['theme', 'isDefault', 'loading'],
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
        },
        backToDefault(){
            this.$emit('backToDefault');
            // erase query line in to the input
            this.$refs.inputThemeRef.query = '';
        }
    },
    computed: {
        //limit the theme photos to 5
        filteredTheme(){
            if(window.innerWidth < 579){
                return this.theme.slice(0, 3);    
            }
            return this.theme.slice(0, 5);
        }
    }
};
</script>

<style lang="scss" scoped>
h4{
    @media (max-width: 400px) {
        margin: 10px auto;
    }
}
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
    text-align: center;
    margin: 0 auto 20px auto;
    max-width: 550px;
    .theme__field {
        display: flex;
        justify-content: space-between;
        flex: 0 0 100px;
    }
    .theme__card {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 10px;
        margin: 5px;
        overflow: hidden; 
        flex-direction: column;
        background-size: cover;
        @media (max-width: 400px) {
            margin: 2px;
        }
    }
    .error {
        font-size: 14px;
        color: red;
    }
    @media (max-width: 400px) {
        margin: 0 auto 10px auto;
    }
}
</style>
