// Get form elements
const form = document.getElementById('transactionForm');
const name = document.getElementById('name');
const email = document.getElementById('email');
const panCard = document.getElementById('panCard');
const transactionType = document.getElementById('transactionType');
const amount = document.getElementById('amount');
const accountNumber = document.getElementById('accountNumber');
const accountNumberGroup = document.getElementById('accountNumberGroup');
const submitButton = document.getElementById('submitButton');
const balance = document.getElementById('balance');
const result = document.getElementById('result');

// Add event listeners
form.addEventListener('submit', handleSubmit);
transactionType.addEventListener('change', toggleAccountNumber);
form.addEventListener('input', validateForm);

// Toggle account number field visibility
function toggleAccountNumber() {
    accountNumberGroup.style.display = transactionType.value === 'transfer' ? 'block' : 'none';
    validateForm();
}

// Validate form inputs
function validateForm() {
    const isValid = form.checkValidity() && 
                    name.value.trim() !== '' &&
                    email.value.trim() !== '' &&
                    panCard.value.trim() !== '' &&
                    transactionType.value !== '' && 
                    amount.value > 0 &&
                    (transactionType.value !== 'transfer' || accountNumber.value.length === 10);

    submitButton.disabled = !isValid;
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();

    // Additional validation
    const currentBalance = parseFloat(balance.value);
    const transactionAmount = parseFloat(amount.value);

    if (transactionType.value === 'debit' || transactionType.value === 'transfer') {
        if (transactionAmount > currentBalance) {
            alert('Insufficient funds. Transaction cancelled.');
            return;
        }
    }

    // Process transaction
    let newBalance;
    switch (transactionType.value) {
        case 'credit':
            newBalance = currentBalance + transactionAmount;
            break;
        case 'debit':
        case 'transfer':
            newBalance = currentBalance - transactionAmount;
            break;
    }

    // Update balance and display result
    balance.value = newBalance.toFixed(2);
    result.textContent = `Transaction successful for ${name.value} (Email: ${email.value}, PAN: ${panCard.value}). New balance: ₹${newBalance.toFixed(2)}`;
    
    // Reset form fields except name, email, PAN, and balance
    transactionType.value = '';
    amount.value = '';
    accountNumber.value = '';
    submitButton.disabled = true;
    accountNumberGroup.style.display = 'none';
}