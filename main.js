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
    var listToShow = [];

    if (currentFilter === "all") {
        listToShow = entries;
    } else {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].type === currentFilter) {
                listToShow.push(entries[i]);
            }
        }
    }

    // If no entries
    if (listToShow.length === 0) {
        noEntriesMsg.style.display = "block";
        entriesDiv.innerHTML = "";
        entriesDiv.appendChild(noEntriesMsg);
        return;
    }

    noEntriesMsg.style.display = "none"; 

    entriesDiv.innerHTML = "";
    for (var i = 0; i < listToShow.length; i++) {
        var entry = listToShow[i];
        var badgeText = entry.type === "income" ? "Income" : "Expense"; 

        var itemHTML =
            '<div class="item">' +
                '<div>' +
                    '<div class="desc">' + entry.description + '</div>' +
                    '<div class="badge ' + entry.type + '">' + badgeText + '</div>' +
                '</div>' +
                '<div class="date-amount">' + 
                    '<span class="date">' + (entry.date || "No date") + '</span>' + 
                    ' | ' +
                    '<span class="amount">Rs ' + entry.amount.toFixed(2) + '</span>' +
                '</div>' +
                '<div class="actions">' +
                    '<button class="edit" onclick="editEntry(\'' + entry.id + '\')">Edit</button>' +
                    '<button class="delete" onclick="deleteEntry(\'' + entry.id + '\')">Delete</button>' +
                '</div>' +
            '</div>';

        entriesDiv.innerHTML += itemHTML;
    }
}

// Add or update entry
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
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].id === editIdInput.value) {
                entries[i].type = type;
                entries[i].description = description;
                entries[i].amount = amount;
                entries[i].date = date; 
            }
        }
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
    for (var i = 0; i < entries.length; i++) {
        if (entries[i].id === id) {
            var entry = entries[i];
            var typeInputs = document.getElementsByName("type");
            for (var j = 0; j < typeInputs.length; j++) {
                if (typeInputs[j].value === entry.type) {
                    typeInputs[j].checked = true;
                }
            }
            descInput.value = entry.description;
            amountInput.value = entry.amount;
            dateInput.value = entry.date || "";
            editIdInput.value = entry.id;
            submitBtn.textContent = "Update Entry";
        }
    }
}

// Delete entry 
function deleteEntry(id) {
    if (confirm("Delete this entry?")) {
        var newList = [];
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].id !== id) {
                newList.push(entries[i]);
            }
        }
        entries = newList;
        saveData();
        showTotals();
        showList();
    }
}

// Filter change
for (var i = 0; i < filterRadios.length; i++) {
    filterRadios[i].addEventListener("change", function(e) {
        currentFilter = e.target.value;
        showList();
    });
}

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
