import inquirer from "inquirer";
//Bank Account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawl of $${amount} succesful.Remaiming balance: $${this.balance} `);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    //Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //$1 fees charge if more than $100 is deposiited
        }
        this.balance += amount;
        console.log(`Deposite of $${amount} successful.Remaining balance: $${this.balance}`);
    }
    //Check balance
    checkBalance() {
        console.log(`current Balance:$${this.balance}`);
    }
}
// Customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//Creat bank account
const account = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
// Creat customers
const customers = [
    new Customer("Hamza", "khan", "Male", 35, 316667882, account[0]),
    new Customer("Rizwan", "Baig", "Male", 25, 333667882, account[1]),
    new Customer("Moona", "Mughal", "Female", 23, 345667882, account[2])
];
// Function To interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome ,${customer.firstName} ${customer.lastName}\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposite", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposite":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:",
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:",
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our servicrs.Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid acount number.Pleasetry again.");
        }
    } while (true);
}
service();
