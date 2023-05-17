export default class ActionsManager {
    constructor() {
        this.actions = [];
        this.balance = 0;
    }
    
    get(propName) {
        return this[propName];
    }
    set(propName, value) {
        this[propName] = value;
    }

    addAction(action) {
        if(action.description != '') {
            this.actions.push(action);
    
            this.setSessionStorage()
            this.calcBalance()
        }
        else alert('Please fill out the description field!')
    }

    deleteAction(id) {
        let indexToDelete = this.actions.findIndex((action) => action.id == id);
        this.actions.splice(indexToDelete, 1);

        this.setSessionStorage()
        this.calcBalance()
    }

    updateAction(id, newAmount) {
        let index = this.actions.findIndex((action) =>
            action.id == id
        )

        //positive-negative switch:
        this.actions[index].amount = this.actions[index].type == 'expense' ? -newAmount : newAmount;

        this.setSessionStorage()
        this.calcBalance()
    }

    calcBalance() {
        this.balance = this.actions.reduce((total, value) => 
            total + value.amount
        , 0)   
        document.getElementById('balance').innerHTML = `Balance: &#8362; ${this.balance}`
    }

    setSessionStorage() {
        sessionStorage.setItem('actions',JSON.stringify(this.actions))
    }
    getSessionStorage() {
        this.actions = JSON.parse(sessionStorage.getItem('actions'))
    }
}