window.billReceiveListComponent = Vue.extend({
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
            <tr v-for="(index,o) in receives">
                <td>{{ index }}</td>
                <td>{{ o.date_due }}</td>
                <td>{{ o.name }}</td>
                <td>{{ o.value | currency 'R$ ' 2 }}</td>
                <td :class="{'pago': o.done, 'nao-pago': !o.done}">
                    <input type="checkbox" :checked="o.done" @click="changeStatus(index)">
                        {{ o.done | doneLabel }}
                </td>
                <td>
                    <a v-link="{ name: 'bill-receive.update', params:{index:index} }">Edit</a> |
                    <a href="#" @click.prevent="deleteReceive(index, o)">Delete</a>
                </td>
            </tr>
        </tbody>
    </table>
    `,
    data: function () {
        return {
            receives: this.$root.$children[0].billReceives
        }
    },
    methods: {
        deleteReceive: function (index, receive) {

            var r = confirm('Tem certeza que deseja excluir a o recebimento "' + receive.name + '"?');

            if (r == true) {
                this.receives.splice(index, 1);
            }

            this.$parent.activedView = 0;
        },
        changeStatus: function (index) {
            return this.receives[index].done = !this.receives[index].done;
        }
    },
    events: {}
});