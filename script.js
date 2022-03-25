const transactionUl = document.querySelector('#transaction')


const dummyTransactions = [
    {id: 1, name: 'Bolo de brigadeiro', amount: -20},
    {id: 1, name: 'Salário', amount: 5000},
    {id: 1, name: 'Combustivel', amount: -50},
    {id: 1, name: 'Mercado Bela Vista', amount: -35}
 ]
 
 const addTransactionsIntoDom = transaction => {
     const operation = transaction.amount < 0 ? '-' : '+'
     const CSSclass = transaction.amount < 0 ? 'minus' : 'plus'
     const amountWithoutOperation = Math.abs(transaction.amount)
     const li = document.createElement('li')
 
     li.classList.add(CSSclass)
     li.innerHTML = `
         ${transaction.name} <span>${operation} R$${amountWithoutOperation}</span><button class="delete-btn">x</button>
     `
    
 }
 addTransactionsIntoDom(dummyTransactions[1])