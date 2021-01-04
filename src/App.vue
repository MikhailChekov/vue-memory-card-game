<template>
    <div class="wrapper">
        <div class="container">
            <Start v-if="isStart" @start="startGame" />
            <h1 class="h1" v-else>Какая-то хрень пошла не так!</h1>
        </div>
    </div>
</template>

<script>
const fs = require('fs');
const path = require('path');

import Start from './components/start/Start.vue';

export default {
    name: 'App',
    components: {
        Start,
    },
    data: () => ({
        isStart: true,
        isLoading: false,
    }),
    methods: {
        startGame(){
            let files = this.getFiles('./assets/img/actors');
            console.log('files', files);
        },
        getFiles(dir, files_){
            files_ = files_ || [];
            var files = fs.readdirSync(dir);
            for (var i in files){
                var name = dir + '/' + files[i];
                if (fs.statSync(name).isDirectory()){
                    getFiles(name, files_);
                } else {
                    files_.push(name);
                }
            }
            return files_;
        }
    }
}
</script>

<style lang="scss">
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
    padding-top: 50px;
}

.h1 {
    color: #dc5b21;
    font: italic 36px Georgia, 'Times New Roman', Times, serif;
}

.container__title {
    margin-bottom: 20px;
}
</style>
