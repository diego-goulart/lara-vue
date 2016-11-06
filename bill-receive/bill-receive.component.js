window.billReceiveComponent = Vue.extend({
    template: `
<div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h1 class="panel-title pull-left">{{ title }}</h1>
                <rec-menu-component></rec-menu-component>
                <div class="clearfix"></div>
            </div>
            <div class="panel-body">
                <div class="alert" :class="{'alert-danger': status > 0, 'alert-success': status == 0, 'alert-info': status === false}" >
                    <p>
                        {{ status | receiveStatus }}
                    </p>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>

    `,
    components: {
        'rec-menu-component': billReceiveMenuComponent
    },
    data: function () {
        return {
            title: "Contas a receber",
        }
    },
    computed: {
        status: function () {
            var receives = this.$root.$children[0].billReceives;
            if (receives.length == 0) {
                return false
            }

            var count = 0;
            for (var i in receives) {
                if (!receives[i].done) {
                    count++;
                }
            }
            return count;
        }
    }
});