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
            this.$dispatch('change-actived-view', id);
            if (id == '1') {
                this.$dispatch('change-form-type','insert');
            }
        }
    }
});



var billListComponent = Vue.extend({
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
    `,
    data: function () {
        return {
            bills: [
                {date_due: '02/11/2016', name: 'Cartão de crédito', value: 599.86, done: true},
                {date_due: '03/11/2016', name: 'Cartão de crédito', value: 69.26, done: false},
                {date_due: '04/11/2016', name: 'Conta de Luz', value: 269.26, done: false},
                {date_due: '05/11/2016', name: 'Conta de Água', value: 129.26, done: false}
            ]
        }
    },
    methods: {
        loadBill: function (bill) {
            this.$parent.bill = bill;
            this.$dispatch('change-bill', bill);
            this.$dispatch('change-actived-view', 1);
            this.$dispatch('change-form-type','update');
        },
        deleteBill: function (index, bill) {

            var r = confirm('Tem certeza que deseja excluir a conta "' + bill.name + '"?');

            if (r == true) {
                this.bills.splice(index, 1);
            }

            this.$parent.activedView = 0;
        },
        changeStatus: function (index) {
            return this.bills[index].done = !this.bills[index].done;
        }
    },
    events: {
        'new-bill': function (bill) {
            this.bills.push(bill);
        },
    }
});



var billCreateComponent = Vue.extend({
    template: `
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
`,

    data: function () {
        return {
            formType: 'insert',
            names: ['Cartão de crédito', 'Supermercado', 'Conta de Luz', 'Conta de Água'],
            bill : {
                date_due: '',
                name: '',
                value: 0,
                done: false,
            }
        };
    },
    methods: {
        submit: function () {

            if (this.formType == 'insert') {
                this.$dispatch('new-bill', this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false,
            };

            this.$dispatch('change-actived-view', 0);
        }
    },
    events: {
        'change-form-type': function (formType) {
            this.formType = formType;
        },
        'change-bill': function (bill) {
            this.bill = bill;
        }
    }
});



var appComponent = Vue.extend({
    template: `
<menu-component></menu-component>
<div class="container-fluid">

    <div class="container">

        <div class="panel panel-default">
            <div class="panel-heading">
                <h1 class="panel-title">{{ title }}</h1>
            </div>
            <div class="panel-body">
                <div class="alert" :class="{'alert-danger': status > 0, 'alert-success': status == 0, 'alert-info': status === false}" >
                    <p>
                        {{ status | accountStatus }}
                    </p>
                </div>

                <div v-show="activedView == 0">
                    <bill-list-component v-ref:bill-list-component></bill-list-component>
                </div>
                <div v-show="activedView == 1">
                    
                    <bill-create-component :bill.sync="bill"></bill-create-component>
                </div>
            </div>
        </div>

    </div>
</div>
    `,
    components: {
        'menu-component': menuComponent,
        'bill-list-component': billListComponent,
        'bill-create-component': billCreateComponent
    },
    data: function () {
        return {
            title: "Contas a pagar",
            activedView: '',
        }
    },
    computed: {
        status: function () {
            var billListComponent = this.$refs.billListComponent;
            if (billListComponent.bills.length == 0) {
                return false
            }

            var count = 0;
            for (var i in billListComponent.bills) {
                if (!billListComponent.bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    },
    methods: {},
    events: {
        'change-actived-view': function (activedView) {
            this.activedView = activedView;
        },
        'change-form-type': function (formType) {
            this.$broadcast('change-form-type', formType);
        },
        'change-bill': function (bill) {
            this.$broadcast('change-bill', bill);
        },
        'new-bill': function (bill) {
            this.$broadcast('new-bill', bill);
        },
    }
});

Vue.component('app-component', appComponent);

var app = new Vue({
    el: '#app',
});


