Vue.filter('doneLabel', function (value) {
    if (value == 0) {
        return "Não Pago"
    }
    return 'Pago';
});


Vue.filter('accountStatus', function (value) {

    if (value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (value > 0) {
        return "Existem " + value + " contas a serem pagas";
    }
    return "Nenhuma conta a ser paga"

});

var menuComponent = Vue.extend({
    template: `
    <nav class="navbar navbar-default navbar-static-top">
    <div class="container">
        <ul class="nav navbar-nav">
            <li v-for="o in menus">
                <a href="#" @click.prevent="showView(o.id)">{{ o.name }}</a>
            </li>
        </ul>
    </div>
</nav>
`,
    data: function () {
        return {
            menus: [
                {id: 0, name: "Listar contas"},
                {id: 1, name: "Criar conta"}
            ],
        };
    },
    methods: {
        showView: function (id) {
            if (id == '1') {
                this.$parent.formType = 'insert'
            }
            this.$parent.activedView = id;
        }
    }
});

Vue.component('menu-component', menuComponent);

var appComponent = Vue.extend({
    template: `
<style type="text/css">
        .pago {
            color: green;
        }

        .nao-pago {
            color: red;
        }

        .no-bills {
            color: gray;
        }
    </style>


<menu-component></menu-component>
<div class="container-fluid">

    <div class="container">

        <div class="panel panel-default">
            <div class="panel-heading">
                <h1 class="panel-title">{{ title }}</h1>
            </div>
            <div class="panel-body">
                <div class="alert" :class="{'nao-pago alert-danger': status > 0, 'pago alert-success': status == 0, 'no-bills alert-info': status === false}" >
                    <p>
                        {{ status | accountStatus }}
                    </p>
                </div>

                <div v-if="activedView == 0">
                    <table border="1" cellpadding="10" class="table table-bordered">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Vencimento</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Paga?</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr v-for="(index,o) in bills">
                            <td>{{ index }}</td>
                            <td>{{ o.date_due }}</td>
                            <td>{{ o.name }}</td>
                            <td>{{ o.value | currency 'R$ ' 2 }}</td>
                            <td :class="{'pago': o.done, 'nao-pago': !o.done}">
                                <input type="checkbox" :checked="o.done" @click="changeStatus(index)">
                                {{ o.done | doneLabel }}
                            </td>
                            <td>
                                <a href="#" @click.prevent="loadBill(o)">Edit</a> |
                                <a href="#" @click.prevent="deleteBill(index, o)">Delete</a>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
                <div v-if="activedView == 1">
                    <h2>Cadastro de Conta</h2>
                    <form @submit.prevent="submit">
                        <label>Date Due</label>
                        <input type="text" v-model="bill.date_due">
                        <br/>
                        <br/>
                        <label>Name</label>
                        <select v-model="bill.name">
                            <option v-for="o in names" :value="o">{{ o }}</option>
                        </select>
                        <br>
                        <br>
                        <label>Value</label>
                        <input type="text" v-model="bill.value">
                        <br><br>
                        <input type="submit" value="Submit">
                    </form>
                </div>
            </div>
        </div>

    </div>
</div>
    `,
    data: function () {
        return {
            title: "Contas a pagar",

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
            ]
        }
    },
    computed: {
        status: function () {

            if (this.bills.length == 0) {
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

        submit: function () {

            if (this.formType == 'insert') {
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

            var r = confirm('Tem certeza que deseja excluir a conta "' + bill.name + '"?');

            if (r == true) {
                this.bills.splice(index, 1);
            }

            this.activedView = 0;
        },
        changeStatus: function (index) {
            return this.bills[index].done = !this.bills[index].done;
        }
    }
});

Vue.component('app-component', appComponent);

var app = new Vue({
    el: '#app',
});


