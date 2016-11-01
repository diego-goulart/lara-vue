Vue.filter('doneLabel', function (value) {
    if(value == 0) {
        return "Não Pago"
    }
    return 'Pago';
});


Vue.filter('accountStatus', function (value) {

    if(value === false){
        return "Nenhuma conta cadastrada";
    }
    if(value > 0) {
        return "Existem " + value + " contas a serem pagas";
    }
    return "Nenhuma conta a ser paga"

});


var app = new Vue({
    el: '#app',
    data: {
        title: "Contas a pagar",
        menus: [
            {id: 0, name: "Listar contas"},
            {id: 1, name: "Criar conta"}
        ],
        activedView: '',
        formType: 1,
        names: ['Cartão de crédito', 'Supermercado', 'Conta de Luz', 'Conta de Água'],
        bill: {
            date_due: '',
            name: '',
            value: 0,
            done: false,
        },
        bills: [
            {date_due: '02/11/2016', name: 'Cartão de crédito', value: 599.86, done: true},
            {date_due: '03/11/2016', name: 'Cartão de crédito', value: 69.26, done: false},
            {date_due: '04/11/2016', name: 'Conta de Luz', value: 269.26, done: false},
            {date_due: '05/11/2016', name: 'Conta de Água', value: 129.26, done: false}
        ],
    },
    computed: {
        status: function () {

            if(this.bills.length == 0){
                return false
            }

            var count = 0;
            for (var i in this.bills) {
                if (!this.bills[i].done) {
                    count++;
                }
            }

            return count;
        }
    },
    methods: {
        showView: function (id) {

            if (id == '1') {
                this.formType = 'insert'
            }

            this.activedView = id;
        },
        submit: function () {

            if(this.formType == 'insert'){
                this.bills.push(this.bill);
            }


            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false,
            }

            this.activedView = 0;
        },
        loadBill: function (bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update'
        },
        deleteBill: function (index, bill) {

            var r = confirm('Tem certeza que deseja excluir a conta "' + bill.name +'"?');

            if(r == true){
                this.bills.splice(index, 1);
            }

            this.activedView = 0;
        },
        changeStatus: function (index) {
            return this.bills[index].done = !this.bills[index].done;
        }
    }
});


