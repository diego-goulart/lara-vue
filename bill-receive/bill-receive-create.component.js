window.billReceiveCreateComponent = Vue.extend({
    template: `
    <h2>Cadastro de Recebimento</h2>
    <form @submit.prevent="submit">
         <label>Date Due</label>
         <input type="text" v-model="receive.date_due">
         <br/>
         <br/>
         <label>Name</label>
         <select v-model="receive.name">
            <option v-for="o in names" :value="o">{{ o }}</option>
         </select>
         <br>
         <br>
         <label>Value</label>
         <input type="text" v-model="receive.value">
         <br><br>
         <input type="submit" value="Submit">
    </form>
`,

    data: function () {
        return {
            formType: 'insert',
            names: ['Salário', 'Freelance'],
            receive : {
                date_due: '',
                name: '',
                value: 0,
                done: false,
            }
        };
    },
    created: function(){
        if(this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getReceive(this.$route.params.index);
        }
    },
    methods: {
        submit: function () {

            if (this.formType == 'insert') {
                this.$root.$children[0].billReceives.push(this.receive);
            }

            this.receive = {
                date_due: '',
                name: '',
                value: 0,
                done: false,
            };

            this.$router.go({name: 'bill-receive.list'});
        },
        getReceive: function (index) {
            var receives = this.$root.$children[0].billReceives;
            this.receive = receives[index];
        }

    },
    events: {
        'change-receive': function (receive) {
            this.receive = receive;
        }
    }
});