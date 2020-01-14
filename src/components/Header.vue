<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link class="navbar-brand" to="/" style="cursor: pointer">Stock Trader</router-link>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav nav">
                    <router-link class="nav-item" tag="li" to="/portfolio" activeClass="active"><a>Portfolio</a></router-link>
                    <router-link class="nav-item" tag="li" to="/stocks" activeClass="active"><a>Stocks</a></router-link>
                </ul>
                <strong class="navbar-text navbar-right">Funds: {{funds | currency }}$</strong>
                <ul class="navbar-nav navbar-right nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click="endDay">End Day</a>
                    </li>
                    <li class="nav-item dropdown" 
                        :class="{open: isDropdownOpen}"
                        @click="isDropdownOpen = !isDropdownOpen">
                        <a 
                            class="nav-link dropdown-toggle" 
                            href="#" id="navbarDropdown" 
                            role="button" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false">
                            Save & Load <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#" @click="saveData">Save Data</a></li>
                            <li><a class="dropdown-item" href="#" @click="fetchData">Load Data</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
    import {mapActions} from 'vuex'; 
    export default {
        data() {
            return {
                isDropdownOpen: false
            };
        },
        computed: {
            funds() {
                return this.$store.getters.funds;
            }
        }, 
        methods: {
            ...mapActions([
                'randomizeStocks',
                'loadData'
            ]),
            endDay() {
                this.randomizeStocks();
            },
            fetchData() {
                this.loadData();
            },
            saveData() {
                const data = {
                    funds: this.funds,
                    stockPortfolio: this.$store.getters.stockPortfolio,
                    stocks: this.$store.getters.stocks
                };

                this.$http.put('data.json', data).then((response) => {
                    console.log(response)
                }, (error) => {
                    console.log(error)
                });
            }
        }
    }
</script>