<template>
    <div>
        <p>
            Congrats you have won! Your game time is -
            <span class="time">{{ this.time }}</span> sec.
        </p>
        <p>Would you like to save result?</p>
        <div class="btns">
            <button @click="save">Save</button>
            <button @click="$emit('back')">Cancel</button>
        </div>
        <div class="input">
            <input type="text" placeholder="Your name" @input="change" v-model="name">
            <div class="error">{{error}}</div>
        </div>
        <img class="firework" src="../../assets/img/common/saljut.gif" alt="" />
    </div>
</template>

<script>

export default {
    data: function(){
        return {
            name: null,
            error: null
        }
    },
    props: ['time'],
    methods: {
        reload() {
            document.location.reload();
        },
        save() {
            if(this.name) {
                this.$emit('save', this.name);
            } else {
                this.error = "Please enter your name..."
            }
        },
        change() {
            if(this.name) {
                this.error = '';
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.input {
    margin-bottom: 10px;
    input {
        border: 1px solid #ccc;
        box-shadow: inset 0 1px 3px #ddd;
        height: 20px;
        border-radius: 5px;
        padding: 12px;
    }
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
.error {
    font-size: 14px;
    color: red;
}
.btns {
    margin-bottom: 10px;
    button {
        cursor: pointer;
        color: #fff;
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
