// Array pentru stocarea înregistrărilor
let records = [];

// Elemente DOM
const incomeForm = document.getElementById('incomeForm');
const recordsList = document.getElementById('recordsList');
const totalProfit = document.getElementById('totalProfit');
const clearAllButton = document.getElementById('clearAll');

// Încarcă înregistrările salvate la pornire
window.addEventListener('load', () => {
    const savedRecords = localStorage.getItem('records');
    if (savedRecords) {
        records = JSON.parse(savedRecords);
        updateRecordsList();
        updateTotalProfit();
    }
});

// Adaugă o nouă înregistrare
incomeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const date = document.getElementById('date').value;
    const amount = parseFloat(document.getElementById('amount').value);
    
    if (isNaN(amount) || amount <= 0) {
        alert('Te rog introdu o sumă validă.');
        return;
    }
    
    const newRecord = {
        date: date,
        amount: amount
    };
    
    records.push(newRecord);
    saveRecords();
        updateRecordsList();
    updateTotalProfit();
    
    // Resetează formularul
    incomeForm.reset();
});

// Actualizează lista de înregistrări
function updateRecordsList() {
    recordsList.innerHTML = '';
    
    records.forEach((record, index) => {
        const li = document.createElement('li');
        
        const dateSpan = document.createElement('span');
        dateSpan.textContent = record.date;
        
        const amountSpan = document.createElement('span');
        amountSpan.textContent = `${record.amount.toFixed(2)} RON`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Șterge';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deleteRecord(index));
        
        li.appendChild(dateSpan);
        li.appendChild(amountSpan);
        li.appendChild(deleteButton);
        
        recordsList.appendChild(li);
    });
}

// Șterge o înregistrare
function deleteRecord(index) {
    records.splice(index, 1);
    saveRecords();
    updateRecordsList();
    updateTotalProfit();
}

// Șterge toate înregistrările
clearAllButton.addEventListener('click', () => {
    if (confirm('Ești sigur că vrei să ștergi toate înregistrările?')) {
        records = [];
        saveRecords();
        updateRecordsList();
        updateTotalProfit();
    }
});

// Actualizează profitul total
function updateTotalProfit() {
    const total = records.reduce((sum, record) => sum + record.amount, 0);
    totalProfit.textContent = total.toFixed(2);
}

// Salvează înregistrările în localStorage
function saveRecords() {
    localStorage.setItem('records', JSON.stringify(records));
}