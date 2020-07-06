const transactionsUL = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []


const removeTransaction = ID => {
    transactions = transactions.filter( ({id}) => id !== ID )
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = ({id, name, amount}) => {
    const operator = amount < 0 ? '-' : '+'
    const CSSClass = amount < 0 ? 'minus' : 'plus'
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${name} 
        <span> ${operator} R$ ${Math.abs(amount)} </span> 
        <button class = "delete-btn" onClick="removeTransaction(${id})" >
        x
        </button>
    `
    transactionsUL.prepend(li)  
}

const updateBalanceValues = () => {
    const transactionsAmount = transactions
        .map(({amount}) => amount)
    const total = transactionsAmount
        .reduce( (acc, amount) => acc + amount ,0)
        .toFixed(2)
    const income = transactionsAmount
        .filter( (amount) => amount > 0 )
        .reduce( (acc, amount) => acc + amount ,0 )
        .toFixed(2)
    const expense = transactionsAmount
    .filter( (amount) => amount < 0 )
    .reduce( (acc, amount) => acc + amount ,0 )
    .toFixed(2)

    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${Math.abs(expense)}`
    balanceDisplay.textContent = `R$ ${total}`
    
}

const init = () => {
    transactionsUL.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()

    if (transactionName === '' || transactionAmount === '') {
        alert('Preencha o Nome e o Valor da transação!')
        return
    }

    const transaction = { 
        id:generateID() , 
        name: transactionName , 
        amount: Number(transactionAmount) 
    }
   
    transactions.push(transaction)
    
    init()

    updateLocalStorage()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''

})