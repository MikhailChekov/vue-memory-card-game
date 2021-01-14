<template>
    <div>
        <input class="c-checkbox" type="checkbox" id="checkbox" @click="focusInput" />
        <div class="c-formContainer">
            <form class="c-form" action="">
                <input ref="inputFocus" class="c-form__input" placeholder="Your theme..." type="text" v-model="query" />
                <label class="c-form__buttonLabel" for="checkbox">
                    <button @click="$emit('search', query)" class="c-form__button" type="button">Send</button>
                </label>
                <label class="c-form__toggle" for="checkbox" data-title="Choose another theme"></label>
            </form>
        </div>
        <div class="loader">
            <Loader  v-if="loading"/>
        </div>
    </div>
</template>

<script>
import Loader from '../common/Loader';

export default {
    data() {
        return {
            query: '',
        };
    },
    props: ['loading'],
    methods: {
        focusInput() {
            //make timeout for add focus after extended animation stop working
            setTimeout(()=> {
              this.$refs.inputFocus.focus();
            },300)
            
        },
    },
    components: {
        Loader
    }
};
</script>

<style lang="scss" scoped>
.c-checkbox {
    display: none;
}

.c-checkbox:checked + .c-formContainer .c-form {
    width: 300px;
}

.c-checkbox:checked + .c-formContainer .c-form__toggle {
    visibility: hidden;
    opacity: 0;
    -webkit-transform: scale(0.7);
    transform: scale(0.7);
}

.c-checkbox:checked + .c-formContainer .c-form__input,
.c-checkbox:checked + .c-formContainer .c-form__buttonLabel {
    -webkit-transition: 0.2s 0.1s;
    transition: 0.2s 0.1s;
    visibility: visible;
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
}

.c-formContainer,
.c-form,
.c-form__toggle {
    width: 250px;
    height: 60px;
}

.c-formContainer {
    position: relative;
    font-weight: 700;
    margin-bottom: 15px;
}

.c-form,
.c-form__toggle {
    position: absolute;
    border-radius: 30px;
    background-color: #ffffff;
    -webkit-transition: 0.2s;
    transition: 0.2s;
}

.c-form {
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    padding: 0.625em;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-shadow: 0 0.125em 0.3125em rgba(0, 0, 0, 0.3);
    box-shadow: 0 0.125em 0.3125em rgba(0, 0, 0, 0.3);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.c-form__toggle {
    color: #70ab8f;
    top: 0;
    cursor: pointer;
    z-index: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.c-form__toggle::before {
    font-size: 24px;
    content: attr(data-title);
}

.c-form__input,
.c-form__button {
    font: inherit;
    border: 0;
    outline: 0;
    border-radius: 5em;
}

.c-form__input,
.c-form__buttonLabel {
    font-size: 24px;
    opacity: 0;
    visibility: hidden;
    -webkit-transform: scale(0.7);
    transform: scale(0.7);
    -webkit-transition: 0s;
    transition: 0s;
}

.c-form__input {
    font-size: 20px;
    color: grey;
    height: 100%;
    width: 100%;
    padding: 0 0.714em;
}

.c-form__button {
    color: #fff;
    cursor: pointer;
    padding: 0;
    height: 100%;
    width: 65px;
    background-color: #70ab8f;
}
</style>
