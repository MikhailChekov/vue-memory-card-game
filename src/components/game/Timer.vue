
<template>
    <div class="timer">
        {{strTimer}}
    </div>
</template>

<script>
    export default {
        data(){
            return {
                currentTime: 0,
                timer: null,
            }
        },
        mounted() {
            this.startTimer()
        },
        methods: {
            startTimer() {
                this.timer = setInterval(() => {
                    ++this.currentTime;
                }, 1000)
            },
            stopTimer() {
                clearTimeout(this.timer)
            }
        },
        computed: {
            strTimer(){
                let seconds = this.currentTime % 60,
                    minutes = Math.trunc(this.currentTime / 60 % 60);
                
                let strTimer = `${minutes < 10 ? '0' + minutes: minutes } : 
                                ${seconds < 10 ? '0' + seconds : seconds}`;
                return strTimer;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .timer{
        text-align: center;
        font-size: 30px;
        color: #70AB8F;
    }
</style>