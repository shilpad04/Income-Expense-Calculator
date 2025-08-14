//  Get page elements 
var totalIncome = document.getElementById("total-income");
var totalExpense = document.getElementById("total-expense");
var netBalance = document.getElementById("net-balance");

var form = document.querySelector(".entry-form");
var descInput = document.getElementById("description");
var amountInput = document.getElementById("amount");
var dateInput = document.getElementById("entry-date"); 
var editIdInput = document.getElementById("edit-id");

var entriesDiv = document.getElementById("added-entries");
var noEntriesMsg = document.getElementById("no-entries-msg");
var filterRadios = document.getElementsByName("filter");

var submitBtn = document.getElementById("submit-btn");
var resetBtn = document.getElementById("reset-btn");

var entries = JSON.parse(localStorage.getItem("entries")) || [];
var currentFilter = "all";

// Save to local storage
function saveData() {
    localStorage.setItem("entries", JSON.stringify(entries));
}

// Show totals 
function showTotals() {
    var income = 0;
    var expense = 0;

    for (var i = 0; i < entries.length; i++) {
        if (entries[i].type === "income") {
            income += entries[i].amount;
        } else if (entries[i].type === "expense") {
            expense += entries[i].amount;
        }
    }

    totalIncome.textContent = "Rs " + income.toFixed(2);
    totalExpense.textContent = "Rs " + expense.toFixed(2);
    netBalance.textContent = "Rs " + (income - expense).toFixed(2);
}

// Show list
function showList() {
    var listToShow = currentFilter === "all" 
        ? entries 
        : entries.filter(e => e.type === currentFilter);

    // If no entries
    if (listToShow.length === 0) {
        noEntriesMsg.style.display = "block";
        entriesDiv.innerHTML = "";
        entriesDiv.appendChild(noEntriesMsg);
        return;
    }

    noEntriesMsg.style.display = "none"; 
    entriesDiv.innerHTML = "";

    listToShow.forEach(entry => {
        var itemDiv = document.createElement("div");
        itemDiv.className = "item";

        // Left section (desc + badge)
        var leftDiv = document.createElement("div");

        var descDiv = document.createElement("div");
        descDiv.className = "desc";
        descDiv.textContent = entry.description;

        var badgeDiv = document.createElement("div");
        badgeDiv.className = "badge " + entry.type;
        badgeDiv.textContent = entry.type === "income" ? "Income" : "Expense";

        leftDiv.appendChild(descDiv);
        leftDiv.appendChild(badgeDiv);

        // Middle section (date + amount)
        var dateAmountDiv = document.createElement("div");
        dateAmountDiv.className = "date-amount"; 

        var dateSpan = document.createElement("span");
        dateSpan.className = "date";
        dateSpan.textContent = entry.date || "No date";

        var amountSpan = document.createElement("span");
        amountSpan.className = "amount";
        amountSpan.textContent = "Rs " + entry.amount.toFixed(2);

        dateAmountDiv.appendChild(dateSpan);
        dateAmountDiv.appendChild(amountSpan);

        // Actions
        var actionsDiv = document.createElement("div");
        actionsDiv.className = "actions";

        var editBtn = document.createElement("button");
        editBtn.className = "edit";
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editEntry(entry.id);

        var deleteBtn = document.createElement("button");
        deleteBtn.className = "delete";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteEntry(entry.id);

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        itemDiv.appendChild(leftDiv);
        itemDiv.appendChild(dateAmountDiv);
        itemDiv.appendChild(actionsDiv);

        entriesDiv.appendChild(itemDiv);
    });
}

// Add  entry
function addEntry(e) {
    e.preventDefault();

    var type = null;
    var typeInputs = document.getElementsByName("type");
    for (var i = 0; i < typeInputs.length; i++) {
        if (typeInputs[i].checked) {
            type = typeInputs[i].value;
        }
    }

    var description = descInput.value.trim();
    var amount = parseFloat(amountInput.value);
    var date = dateInput.value; 

    if (!type || description === "" || isNaN(amount) || amount <= 0 || date === "") { 
        alert("Please enter valid data.");
        return;
    }

    if (editIdInput.value) {
        entries.forEach(e => {
            if (e.id === editIdInput.value) {
                e.type = type;
                e.description = description;
                e.amount = amount;
                e.date = date;
            }
        });
        editIdInput.value = "";
        submitBtn.textContent = "Add Entry";
    } else {
        var newEntry = {
            id: Date.now().toString(),
            type: type,
            description: description,
            amount: amount,
            date: date 
        };
        entries.push(newEntry);
    }

    saveData();
    showTotals();
    showList();
    form.reset();
}

// Edit entry
function editEntry(id) {
    entries.forEach(entry => {
        if (entry.id === id) {
            document.querySelector(`input[name="type"][value="${entry.type}"]`).checked = true;
            descInput.value = entry.description;
            amountInput.value = entry.amount;
            dateInput.value = entry.date || "";
            editIdInput.value = entry.id;
            submitBtn.textContent = "Update Entry";
        }
    });
}

// Delete entry 
function deleteEntry(id) {
    if (confirm("Delete this entry?")) {
        entries = entries.filter(e => e.id !== id);
        saveData();
        showTotals();
        showList();
    }
}

// Filter change
filterRadios.forEach(radio => {
    radio.addEventListener("change", e => {
        currentFilter = e.target.value;
        showList();
    });
});

// Reset form 
resetBtn.addEventListener("click", function() {
    form.reset();
    editIdInput.value = "";
    submitBtn.textContent = "Add Entry";
});

// Submit form
form.addEventListener("submit", addEntry);

showTotals();
showList();

window.editEntry = editEntry;
window.deleteEntry = deleteEntry;
