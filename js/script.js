const transactionsUL = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')

const dummyTransaction = [
    { id:1 , name:'Bolo de brigadeiro' , amount:-20 },
    { id:2 , name:'Salário' , amount:300 },
    { id:3 , name:'Trota de Frango' , amount:-10 },
    { id:4 , name:'Violão' , amount:150 }
]

const addTransactionIntoDOM = ({id, name, amount}) => {
    const operator = amount < 0 ? '-' : '+'
    const CSSClass = amount < 0 ? 'minus' : 'plus'
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${name} <span> ${operator} R$ ${Math.abs(amount)} </span> <button class = "delete-btn">x</button>
    `
    transactionsUL.prepend(li)  
}

const updateBalanceValues = () => {
    const transactionsAmount = dummyTransaction.map(({amount}) => amount)
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
    dummyTransaction.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()