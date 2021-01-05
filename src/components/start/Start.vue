<template>
    <div class="start">
        <div class="start__title">
            <h1 class="h1">Memory card game - Vue js</h1>
        </div>
        <div class="start__body">
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
            <button class="button" @click="$emit('start')">Start</button>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            // theme: 'Flags',
        };
    },
};
</script>

<style lang="scss" scoped>
.start__body {
    font-size: 24px;
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
