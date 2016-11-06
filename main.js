var router = new VueRouter();
var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: `<bill-component></bill-component>`,
    data: function () {
        return {
            billPays: [
                {date_due: '02/11/2016', name: 'Cartão de crédito', value: 599.86, done: true},
                {date_due: '03/11/2016', name: 'Cartão de crédito', value: 69.26, done: false},
                {date_due: '04/11/2016', name: 'Conta de Luz', value: 269.26, done: false},
                {date_due: '05/11/2016', name: 'Conta de Água', value: 129.26, done: false}
            ],
            billReceives: [
                {date_due: '05/11/2016', name: 'Salário', value: 1500, done: true},
                {date_due: '04/11/2016', name: 'Freelance', value: 1600, done: true},
                {date_due: '06/11/2016', name: 'Freelance', value: 600, done: true},
                {date_due: '07/11/2016', name: 'Freelance', value: 5000, done: false}
            ]
        }
    }

});

    router.map({
        '/': {
            name: 'dashboard',
            component: dashboardComponent
        },
        '/bill-pays': {
            component: billPayComponent,
            subRoutes: {
                '/': {
                 name: 'bill-pay.list',
                 component: billPayListComponent
                 },
                 '/create': {
                 name: 'bill-pay.create',
                 component: billPayCreateComponent

                 },
                 '/:index/update': {
                 name: 'bill-pay.update',
                 component: billPayCreateComponent

                 }
            }
        },
        '/bill-receives': {
            component: billReceiveComponent,
            subRoutes: {
                '/': {
                    name: 'bill-receive.list',
                    component: billReceiveListComponent
                },
                '/create': {
                    name: 'bill-receive.create',
                    component: billReceiveCreateComponent

                },
                '/:index/update': {
                    name: 'bill-receive.update',
                    component: billReceiveCreateComponent

                }
            }
        },

    });

    router.start({
        components: {
            'main-component': mainComponent
        }
    }, '#app');

