<template>
    <div>
        <p>
            Congrats you have won! Your game time is -
            <span class="time">{{ this.time }}</span> sec.
        </p>
        <p>Would you like to save result?</p>
        <div class="btns">
            <button @click="save">Save</button>
            <button @click="reload">Cancel</button>
        </div>
        <div class="input">
            <input type="text" placeholder="Your name" v-model="name">
        </div>
        <img class="firework" src="../../assets/img/common/saljut.gif" alt="" />
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            name: null
        }
    },
    props: ['time'],
    methods: {
        reload() {
            document.location.reload();
        },
        save() {

        }
    }
};
</script>

<style lang="scss" scoped>
.input {
    margin-bottom: 10px;
}
.firework {
    width: 400px;
}
.time {
    font-size: 20px;
    color: #dc5b21;
}
p {
    font-size: 18px;
}
.btns {
    margin-bottom: 10px;
    button {
        cursor: pointer;
        margin-right: 10px;
        padding: 10px 20px;
        border-radius: 10px;
        background-color: #b6d8d5;
        &:hover {
            transition: 0.3s ease;
            background-color: #76c4be;
        }
    }
}
</style>
