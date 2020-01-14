<template>
    <div class="col-sm-6 col-md-4">
        <div class="panel panel-info">
            <div class="panel-heading">
                <div class="panel-title">
                    {{stock.name}}
                    <small>(Price: {{stock.price | currency}} | Quantity: {{stock.quantity}})</small>
                </div> 
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input type="number" 
                        class="form-control" 
                        placeholder="Quantity"
                        v-model="quantity"
                        :class="{danger: insufficientQuantity}">
                </div>
                <div class="pull-right">
                    <button :class="insufficientQuantity? 'btn btn-danger':'btn btn-success'"
                        @click="sellStock"
                        :disabled= "insufficientQuantity || Number(quantity) == 0 || !Number.isInteger(Number(quantity))"
                        >
                         {{insufficientQuantity ? 'Not Enough Stocks': 'Sell'}}
                    </button>
                </div>  
            </div>    
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        data() {
            return {
                quantity: 0
            };
        },
        props: ['stock'],
        methods: {
            sellStock() {
                const order = {
                    stockId: this.stock.id,
                    stockPrice: this.stock.price,
                    quantity: Number(this.quantity)
                };
                this.sellOrder(order);
                this.quantity = 0;
            },
            ...mapActions({
                sellOrder: 'sellStock'
            })
        },
        computed: {
            insufficientQuantity() {
                return Number(this.quantity) > this.stock.quantity;
            }
        }
    }
</script>

<style scoped>
    .danger {
        border: 1px solid red;
    }
</style>