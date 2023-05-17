import Action from "./classes/Action.js"
import ActionsManager from "./classes/ActionsManager.js"

let manager = new ActionsManager();

manager.getSessionStorage();
if (manager.actions == null) {
    manager.actions = []
    manager.setSessionStorage()
}
manager.calcBalance();
showActionsInTable();

function showActionsInTable() {
    document.getElementById('actions').innerHTML = ''
    for (let action of manager.actions) {
        let color = action.type == 'income' ? 'success' : 'danger'
        document.getElementById('actions').innerHTML += `<tr class=" text-${color}">
            <td>${action.description}</td>
            <td>&#8362; ${action.amount}</td>
            <td><i class="fa-regular fa-pen-to-square" style="cursor: pointer" onclick="updateAction(${action.id})"></i></td>
            <td><i class="fa-regular fa-trash-can" style="cursor: pointer" onclick="deleteAction(${action.id})"></i></td>
        </tr>`
    }
}

window.addNewAction = () => {
    // take the form values
    let type = document.getElementById("type").value;
    let description = document.getElementById("description").value;
    let amount = +document.getElementById("amount").value;

    // create action object
    let newAction = new Action(type, description, amount);

    // add newAction to manager actions array
    manager.addAction(newAction);

    //reset UI
    document.getElementById("type").value = "income";
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    showActionsInTable()
};

window.updateAction = (id) => {
    //prompt
    let newAmount = prompt("Enter new amount:");
    if (newAmount == null || newAmount == "" || newAmount != +newAmount) {
        alert("Sorry! Something went wrong");
    }
    else {
        //update action
        manager.updateAction(id, +newAmount)

        showActionsInTable()
    }
}

window.deleteAction = (id) => {

    if (confirm("Are you sure?")) {
        manager.deleteAction(id)
        showActionsInTable()
    }
}
