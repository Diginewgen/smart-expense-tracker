const form = document.getElementById("transaction-form");
const transactionsList = document.getElementById("transactions");

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI(){

transactionsList.innerHTML="";

let income=0;
let expense=0;

transactions.forEach((t,index)=>{

const li=document.createElement("li");

li.innerHTML=`
${t.description} (${t.category})
<span>
$${t.amount}
<button onclick="deleteTransaction(${index})">❌</button>
</span>
`;

transactionsList.appendChild(li);

if(t.amount>0){
income+=t.amount;
}else{
expense+=Math.abs(t.amount);
}
});

document.getElementById("income").innerText=
`$${income.toFixed(2)}`;

document.getElementById("expense").innerText=
`$${expense.toFixed(2)}`;

document.getElementById("balance").innerText=
`$${(income-expense).toFixed(2)}`;

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);
}

function deleteTransaction(index){
transactions.splice(index,1);
updateUI();
}

form.addEventListener("submit",(e)=>{
e.preventDefault();

const description=
document.getElementById("description").value;

const amount=parseFloat(
document.getElementById("amount").value
);

const category=
document.getElementById("category").value;

transactions.push({
description,
amount,
category
});

form.reset();
updateUI();
});

updateUI();
