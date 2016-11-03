window.billPayCreateComponent = Vue.extend({
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
    created: function(){
        if(this.$route.name == 'bill.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.index);
        }
    },
    methods: {
        submit: function () {

            if (this.formType == 'insert') {
                this.$root.$children[0].billsPay.push(this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false,
            };

            this.$router.go({name: 'bill.list'});
        },
        getBill: function (index) {
            var bills = this.$root.$children[0].billsPay;
            this.bill = bills[index];
        }

    },
    events: {
        'change-bill': function (bill) {
            this.bill = bill;
        }
    }
});