# 💰 Income–Expense Calculator

A clean, responsive web application to track your **income** and **expenses**, view totals, filter entries, and store data persistently using **Local Storage**.

---

## 📌 Features

- **Add New Entries**  
  Add income or expense entries with a description and amount.

- **Edit Existing Entries**  
  Update any previously saved income or expense record.

- **Delete Entries**  
  Remove entries you no longer need.

- **Filter Entries**  
  View **All**, **Income only**, or **Expense only** using radio button filters.

- **Live Totals**  
  View **Total Income**, **Total Expenses**, and **Net Balance** dynamically.

- **Responsive Design**  
  Works seamlessly on **desktop**, **tablet**, and **mobile**.

- **Local Storage Support**  
  All data persists in your browser, even after refresh or reopening the page.

---

## 🛠️ Technologies Used

- **HTML5** – Structure of the app.
- **CSS3** – Styling, responsive layout, and theme.
- **JavaScript (Vanilla)** – Application logic, data handling, and DOM updates.
- **Local Storage API** – Data persistence.

---

## 📂 File Structure

```
project/
│
├── index.html      # Main HTML structure
├── style.css       # Stylesheet (theme, layout, responsive design)
├── main.js         # JavaScript logic (CRUD operations, filtering, totals)
└── README.md       # Project documentation
```

---

## 🚀 Installation & Usage

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/income-expense-calculator.git
   ```

2. **Navigate to the Project Folder**
   ```bash
   cd income-expense-calculator
   ```

3. **Open the Application**
   - Double-click `index.html`  
     **OR**  
   - Open in a browser:
     ```bash
     open index.html
     ```

---

## 📖 How It Works

1. **Adding an Entry**
   - Select **Income** or **Expense**.
   - Enter a description (e.g., *Salary*, *Groceries*).
   - Enter an amount (positive number).
   - Click **Add Entry**.

2. **Editing an Entry**
   - Click **Edit** next to the entry.
   - Update the fields.
   - Click **Update Entry**.

3. **Deleting an Entry**
   - Click **Delete** next to the entry.
   - Confirm the deletion.

4. **Filtering Entries**
   - Use the **All**, **Income**, or **Expense** radio buttons to filter the list.

5. **Viewing Totals**
   - Totals update automatically when entries are added, updated, or deleted.

---

## 📱 Responsive Design

- **Desktop**:
  - Description and Amount fields displayed **side-by-side**.
  - Totals displayed in a single row.
- **Mobile**:
  - Fields stack vertically.
  - Totals stack vertically for better readability.

---

## 💾 Local Storage

The application uses the browser's `localStorage` to:
- Save all entries.
- Restore them when the page is refreshed or reopened.

**Note**: Clearing your browser data will remove saved entries.

---

## 👨‍💻 Author 
- GitHub: shilpad04(https://github.com/shilpad04)  

---
