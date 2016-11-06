/**
 * Filtro para alterar a cor do status de uma conta com base
 * se ela está ou não paga.
 */
Vue.filter('doneLabel', function (value) {
    if (value == 0) {
        return "Não Pago"
    }
    return 'Pago';
});


/**
 * Filtro que traz um resumo geral das contas.
 */
Vue.filter('accountStatus', function (value) {

    if (value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (value > 0) {
        return "Existem " + value + " contas a serem pagas";
    }
    return "Nenhuma conta a ser paga"

});

/**
 * Filtro que traz um resumo geral dos recebimentos.
 */
Vue.filter('receiveStatus', function (value) {

    if (value === false) {
        return "Nenhum recebimento cadastrado";
    }
    if (value > 0) {
        return "Existem " + value + " recebimentos em aberto";
    }
    return "Nenhum recebimento em aberto"

});