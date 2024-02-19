// CREATE AN ARRAY OF EMPLOYEES
let employees = [];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF IT DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF THE POPULATED ARRAY
if (localStorage.getItem('employeeData')) {
    employees = JSON.parse(localStorage.getItem('employeeData'));
}

// GET DOM ELEMENTS
const form = document.getElementById('addForm');
const empTable = document.getElementById('empTable');
const empCount = document.getElementById('empCount');

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid();

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const extension = document.getElementById('extension').value;
    const email = document.getElementById('email').value;
    const department = document.getElementById('department').value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    const newEmployee = {
        id: id,
        name: name,
        extension: extension,
        email: email,
        department: department
    };

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee);

    // BUILD THE GRID
    buildGrid();

    // RESET THE FORM
    form.reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    document.getElementById('id').focus();
});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if (confirm('Are you sure you want to delete this employee?')) {
        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        const rowIndex = e.target.parentNode.parentNode.rowIndex;

        // REMOVE EMPLOYEE FROM ARRAY
        employees.splice(rowIndex - 1, 1);

        // BUILD THE GRID
        buildGrid();
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.querySelector('tbody').remove();

    // REBUILD THE TBODY FROM SCRATCH
    const tbody = empTable.createTBody();

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    employees.forEach(employee => {
        // REBUILDING THE ROW STRUCTURE
        const row = tbody.insertRow();
        for (const key in employee) {
            const cell = row.insertCell();
            const text = document.createTextNode(employee[key]);
            cell.appendChild(text);
        }

        // CREATE DELETE BUTTON CELL
        const deleteCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.className = 'btn btn-danger';
        deleteCell.appendChild(deleteButton);
    });

    // UPDATE EMPLOYEE COUNT
    empCount.textContent = `(${employees.length})`;

    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('employeeData', JSON.stringify(employees));
}
