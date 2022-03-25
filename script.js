// está pegando o botão do html e jogando nessa variavel
const transactionsUl = document.querySelector('#transactions')
// está pegando o id da receita 
const incomeDisplay = document.querySelector('#money-plus')
// está pegando o id das despesas
const expenseDisplay = document.querySelector('#money-minus')
// está pegando o id do balanço 
const balanceDisplay = document.querySelector('#balance')
// está pegando o id do form
const form = document.querySelector('#form')
//pegando o id do input do nome da transação
const inputTransactionName = document.querySelector('#text')
//pegando o id do input do valor
const inputTransactionAmount = document.querySelector('#amount')




/*// array com os produtos
Função está comentada por causa do criação dinamica de itens pela transações,

let transactions = [                                     
    {id: 1, name: 'Bolo de brigadeiro', amount: -20},
    {id: 1, name: 'Salário', amount: 5000},
    {id: 1, name: 'Combustivel', amount: -50},
    {id: 1, name: 'Mercado Bela Vista', amount: -35}
 ]*/

 // localstorage
 const localstorageTransactions = JSON.parse(localStorage
    .getItem('transactions')) 
 let transactions = localStorage
    .getItem('transactions') !== null ? localstorageTransactions : []

 //remove os itens
 const removeTransaction = ID => {
    transactions = transactions.filter(transaction => 
    transaction.id !== ID)
    updateLocalStorage()
    init()
 }
 
 // identifica transação e insere lista no html
const addTransactionsIntoDom = transaction => {
    const operation = transaction.amount < 0 ? '-' : '+'
    const CSSclass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperation = Math.abs(transaction.amount)
    const li = document.createElement('li')
 
    li.classList.add(CSSclass)
    li.innerHTML = `
        ${transaction.name} 
        <span>${operation} R$${amountWithoutOperation}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
            x
        </button>
    `
    transactionsUl.append(li)
    console.log(li);
}
 // reiniciar a pagina quando uma transação for executada
const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionsIntoDom)
    updateBalanceValues()
}

// função para calcular receitas e despesas
const updateBalanceValues = () => {
    const transactionAmounts = transactions
        .map(transaction => transaction.amount)
    const total = transactionAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2)
    const income = transactionAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    const expense = Math.abs(transactionAmounts
        .filter(value => value <0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
    console.log(expense);
}
 

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random()*1000)
form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    if(inputTransactionName.value.trim()=== '' || inputTransactionAmount.value.trim()=== ''){
        alert('Por favor preencha tanto o nome quanto o valor da transação')
        return
    }

    const transaction =  {
        id: generateID(),
        name: transactionName, 
        amount: Number(transactionAmount)
    }
    transactions.push(transaction)
    init()
    updateLocalStorage()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''

})