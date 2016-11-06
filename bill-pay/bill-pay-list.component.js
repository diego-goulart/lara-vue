window.billPayListComponent = Vue.extend({
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
                    <a v-link="{ name: 'bill-pay.update', params:{index:index} }">Edit</a> |
                    <a href="#" @click.prevent="deleteBill(index, o)">Delete</a>
                </td>
            </tr>
        </tbody>
    </table>
    `,
    data: function () {
        return {
            bills: this.$root.$children[0].billPays
        }
    },
    methods: {
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
    }
});