var app = new Vue({
    el: '#app',
    data: {
        title: "Contas a pagar",
        bills: [
            {date_due: '02/11/2016', name: 'Cartão de Crédito 1', value: 599.86, done: 1},
            {date_due: '03/11/2016', name: 'Cartão de Crédito 2', value: 69.26, done: 0},
            {date_due: '04/11/2016', name: 'Conta de Luz', value: 269.26, done: 0},
            {date_due: '05/11/2016', name: 'Conta de Água', value: 129.26, done: 0}
        ]
    },
    computed: {
        status: function () {
            var count = 0;
            for(var i in this.bills) {
                if(!this.bills[i].done) {
                    count++;
                }
            }

            return !count?"Nenhuma conta a ser paga":"Existem "+count+" contas a serem pagas";
        }
    }
});
