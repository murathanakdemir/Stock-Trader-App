<template>
    <div class="col-sm-6 col-md-4">
        <div class="panel panel-success">
            <div class="panel-heading">
                <div class="panel-title">
                    {{stock.name}}
                    <small>(Price: {{stock.price | currency}})</small>
                </div> 
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input type="number" 
                        class="form-control" 
                        placeholder="Quantity"
                        v-model="quantity"
                        :class="{danger: insufficientFunds}">
                </div>
                <div class="pull-right">
                    <button :class="insufficientFunds? 'btn btn-danger':'btn btn-success'"
                        @click="buyStock"
                        :disabled= "insufficientFunds ||Number(quantity) == 0 || !Number.isInteger(Number(quantity))"
                        >
                        {{insufficientFunds ? 'Insufficient Funds': 'Buy'}}
                    </button>
                </div>  
            </div>    
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                quantity: 0
            };
        },
        props: ['stock'],
        methods: {
            buyStock() {
                const order = {
                    stockId: this.stock.id,
                    stockPrice: this.stock.price,
                    quantity: Number(this.quantity)
                };
                this.$store.dispatch('buyStock',order);
                this.quantity = 0;
            }
        },
        computed: {
            funds() {
                return this.$store.getters.funds;
            },
            insufficientFunds() {
                return Number(this.quantity) * this.stock.price > this.funds;
            }
        }
    }
</script>

<style scoped>
    .danger {
        border: 1px solid red;
    }
</style>