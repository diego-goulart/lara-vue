var router = new VueRouter();
var mainComponent = Vue.extend({
    components: {
        'bill-pay-component': billPayComponent
    },
    template: `<bill-pay-component></bill-pay-component>`,
    data: function () {
        return {
            billsPay: [
                {date_due: '02/11/2016', name: 'Cartão de crédito', value: 599.86, done: true},
                {date_due: '03/11/2016', name: 'Cartão de crédito', value: 69.26, done: false},
                {date_due: '04/11/2016', name: 'Conta de Luz', value: 269.26, done: false},
                {date_due: '05/11/2016', name: 'Conta de Água', value: 129.26, done: false}
            ]
        }
    }
});

    router.map({
        '/bills': {
            name: 'bill.list',
            component: billPayListComponent
        },
        'bill/create': {
            name: 'bill.create',
            component: billPayCreateComponent
        },
        'bill/:index/update': {
            name: 'bill.update',
            component: billPayCreateComponent
        },
        '*': {
            component: billPayListComponent
        }
    });

    router.start({
        components: {
            'main-component': mainComponent
        }
    }, '#app');

    router.redirect({
        '*': '/bills'
    });
