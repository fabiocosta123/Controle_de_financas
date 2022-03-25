// está pegando o botão do html e jogando nessa variavel
const transactionsUl = document.querySelector('#transactions')

// array com os produtos
const dummyTransactions = [                                     
    {id: 1, name: 'Bolo de brigadeiro', amount: -20},
    {id: 1, name: 'Salário', amount: 5000},
    {id: 1, name: 'Combustivel', amount: -50},
    {id: 1, name: 'Mercado Bela Vista', amount: -35}
 ]
 
 // identifica transação e insere lista no html
const addTransactionsIntoDom = transaction => {
    const operation = transaction.amount < 0 ? '-' : '+'
    const CSSclass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperation = Math.abs(transaction.amount)
    const li = document.createElement('li')
 
    li.classList.add(CSSclass)
    li.innerHTML = `
        ${transaction.name} <span>${operation} R$${amountWithoutOperation}</span><button class="delete-btn">x</button>
    `
    transactionsUl.append(li)
    console.log(li);
}
 // reiniciar a pagina quando uma transação for executada
const init = () => {
    dummyTransactions.forEach(addTransactionsIntoDom)
    updateBalanceValues()
}

// função para calcular receitas e despesas
const updateBalanceValues = () => {
    const transactionAmounts = dummyTransactions
        .map(transaction => transaction.amount)
    const total = transactionAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2)
    const income = transactionAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    const expense = transactionAmounts
        .filter(value => value <0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    console.log(expense);
}
 

init()