var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["totalAmt"] = document.getElementById("totalAmt").value;
    formData["category"] = document.getElementById("category").value;
    formData["dec"] = document.getElementById("dec").value;

    var totalAmt = document.getElementById("totalAmt").value;
    var category = document.getElementById("category").value;
    let dec = document.getElementById("dec").value;
    const formVal = {
        amount: totalAmt,
        category: category,
        description: dec,
    };
    localStorage.setItem('Data', JSON.stringify(formVal));
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.totalAmt;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.category;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.dec;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("totalAmt").value = "";
    document.getElementById("category").value = "";
    document.getElementById("dec").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("totalAmt").value = selectedRow.cells[0].innerHTML;
    document.getElementById("category").value = selectedRow.cells[1].innerHTML;
    document.getElementById("dec").value = selectedRow.cells[2].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.totalAmt;
    selectedRow.cells[1].innerHTML = formData.category;
    selectedRow.cells[2].innerHTML = formData.dec;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        localStorage.removeItem('Data');
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("totalAmt").value == "") {
        isValid = false;
        document.getElementById("totalAmtValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("totalAmtValidationError").classList.contains("hide"))
            document.getElementById("totalAmtValidationError").classList.add("hide");
    }
    return isValid;
}