<template>
    <div>
        <h2>Results</h2>
        <div class="tableWrapper">
            <div class="table">
                <div class="table-header">
                    <div class="header__item header-col"><div id="name" class="table_name" href="#">#</div></div>
                    <div class="header__item header-col"><div id="name" class="table_name" href="#">12 cards</div></div>
                    <div class="header__item header-col"><div id="wins" class="table_name " href="#">Time</div></div>
                </div>
                <ol class="table-content" type="1">
                    <li v-for="(player, i) in sortedResults.ease" :key="i" class="table-row">
                        <div class="table-data row-col">{{i+1}}</div>
                        <div class="table-data row-col">{{player.name}}</div>
                        <div class="table-data row-col">{{player.score}}</div>
                    </li>
                </ol>
            </div>
            <div class="table">
                <div class="table-header">
                    <div class="header__item header-col"><div id="name" class="table_name" href="#">#</div></div>
                    <div class="header__item header-col"><div id="name" class="table_name" href="#">20 cards</div></div>
                    <div class="header__item header-col"><div id="wins" class="table_name " href="#">Time</div></div>
                </div>
                <ol class="table-content" type="1">
                    <li v-for="(player, i) in sortedResults.middle" :key="i" class="table-row">
                        <div class="table-data row-col">{{i+1}}</div>
                        <div class="table-data row-col">{{player.name}}</div>
                        <div class="table-data row-col">{{player.score}}</div>
                    </li>
                </ol>
            </div>
            <div class="table">
                <div class="table-header">
                    <div class="header__item header-col"><div id="name" class="table_name" href="#">#</div></div>
                    <div class="header__item header-col"><div id="name" class="table_name" href="#">36 cards</div></div>
                    <div class="header__item header-col"><div id="wins" class="table_name " href="#">Time</div></div>
                </div>
                <ol class="table-content" type="1">
                    <li v-for="(player, i) in sortedResults.hard" :key="i" class="table-row">
                        <div class="table-data row-col">{{i+1}}</div>
                        <div class="table-data row-col">{{player.name}}</div>
                        <div class="table-data row-col">{{player.score}}</div>
                    </li>
                </ol>
            </div>
        </div>
        <button @click="$emit('back')" class="button">На главную</button>
    </div>
</template>

<script>
import { DEFRESULTS } from '../../constants';

export default {
    props: ['results'],
    computed: {
        sortedResults() {
            let sortedResults = this.results;
            for(let level in sortedResults){
                sortedResults[level].sort((a, b) => a.score - b.score)
                // sortedResults[level].length > 10
            }
            return sortedResults;
        }
    }
};
</script>

<style lang="scss" scoped>

*{
    margin: 0;
    padding: 0;
}
ol{
    list-style-type: decimal;
}

h2{
    margin: 0px 0px 10px 0px;
}

$base-spacing-unit: 12px;
$half-spacing-unit: $base-spacing-unit / 2;

$color-alpha: #1772ff;
$color-form-highlight: #eeeeee;

.tableWrapper{
    display: flex;
    justify-content: space-between;
    margin: 0px 0px 20px 0px;
}

.table {
    flex: 0 1 33%;
    border: 1px solid $color-form-highlight;
    background-color: #fff;
}
.table-header {
    display: flex;
    width: 100%;
    background: #000;
    padding: ($half-spacing-unit * 1.5) 0;
    .header-col{
        flex: 1 1 100%;
        &:first-child{
            flex: 0 0 10%;
        }
        &:last-child{
            flex: 0 0 30%;
        }
    }
}

.table-row {
    display: flex;
    width: 100%;
    padding: ($half-spacing-unit * 1.5) 0;

    &:nth-of-type(odd) {
        background: $color-form-highlight;
    }

    .row-col{
        flex: 1 1 100%;
        &:first-child{
            flex: 0 0 10%;
        }
        &:last-child{
            flex: 0 0 30%;
        }
    }
}

.table-data,
.header__item {
    flex: 1 1 20%;
    text-align: center;
}

.header__item {
    text-transform: uppercase;
}

.table_name {
    color: white;
    text-decoration: none;
}
</style>
