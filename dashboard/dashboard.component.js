window.dashboardComponent = Vue.extend({
    template: `

<div class="container">
    <h1>{{title}}</h1>
    <br>
    <table class="table table-bordered">
        <tr>
            <th>Contas à pagar:</th>
            <td>{{status.not_due_bills | currency 'R$ ' 2}}</td>
        </tr>
        <tr>
            <th>Contas pagas</th>
            <td>{{status.due_bills_sum | currency 'R$ ' 2}}</td>
        </tr>
        <tr>
            <th>Total</th>
            <td>{{status.due_bills_sum + status.not_due_bills | currency 'R$ ' 2}}</td>
        </tr>
    </table>
    <br>
    <table class="table table-bordered">
        <tr>
            <th>Contas à receber:</th>
            <td>{{status.not_due_receives | currency 'R$ ' 2}}</td>
        </tr>
        <tr>
            <th>Contas recebidas</th>
            <td>{{status.due_receives | currency 'R$ ' 2}}</td>
        </tr>
        <tr>
            <th>Total</th>
            <td>{{status.due_receives + status.not_due_receives | currency 'R$ ' 2}}</td>
        </tr>
    </table>
    <br>
    <table class="table table-bordered">
        <tr>
            <th>Salto Atual:</th>
            <td>{{status.due_receives - status.due_bills_sum | currency 'R$ ' 2}}</td>
        </tr>
        <tr>
            <th>Salto Projetado:</th>
            <td>{{(status.due_receives + status.not_due_receives) - (status.due_bills_sum + status.not_due_bills) | currency 'R$ ' 2}}</td>
        </tr>
    </table>
</div>
`,
    components: {
        'bill-component': billComponent
    },
    data: function () {
        return {
            title: "My Dashboard",
        }
    },
    methods:{
        getResume : function () {
            var bills = this.$root.$children[0].billPays;
            var receives = this.$root.$children[0].billReceives;

            var bills = this.$root.$children[0].billPays;
            var receives = this.$root.$children[0].billReceives;

            var result = {
                due_bills_sum: 0,
                not_due_bills: 0,
                due_receives: 0,
                not_due_receives: 0,
            };


            for(var i = 0, len = bills.length; i < len; i++){

                if(bills[i].done){
                    result.due_bills_sum += bills[i].value
                }else{
                    result.not_due_bills += bills[i].value;
                }


            }

            var receivesSum = 0;

            for(var i = 0, len = receives.length; i < len; i++){
                result.due_receives += receives[i].done? receives[i].value: 0;
                result.not_due_receives += !receives[i].done? receives[i].value:0;
            }

            return result;
        }
    },
    computed: {

        status: function () {
            return this.getResume();
        }
    }
});