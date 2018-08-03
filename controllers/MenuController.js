const inquirer = require('inquirer');
const ContactController = require("./ContactController");

module.exports = class MenuController {
  constructor(){
    this.mainMenuQuestions = [
      {
        type: "list",
        name: "mainMenuChoice",
        message: "Please choose from an option below: ",
        choices: [
          "Add new contact",
          "View all contacts",
          "Get date",
          "Exit"
        ]
      }
    ];

    this.book = new ContactController();
  }

  main() {
    console.log("Welcome to AddressBloc!");
    inquirer.prompt(this.mainMenuQuestions).then((response) => {
      switch(response.mainMenuChoice) {
        case "Add new contact":
          this.addContact();
          break;
        case "View all contacts":
          this.getContacts();
          break;
        case "Exit":
          this.exit();
        case "Get date":
          this.getDate();
          break;
        default:
          console.log("Invalid input");
          this.main();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  clear() {
    console.log('\x1Bc');
  }

  addContact() {
    this.clear();
    inquirer.prompt(this.book.addContactQuestions).then((answers) => {
      this.book.addContact(answers.name, answers.phone).then((contact) => {
        console.log("Contact added successfully!");
        this.main();
      }).catch((err) => {
        console.log(err);
        this.main();
      });
    });
  }

  exit() {
    console.log("Thanks for using AddressBloc!");
    process.exit();
  }


  getContactCount() {
    return this.book.contacts.length;
  }

  getDate() {
    let d = new Date();
    let dd = d.getDate();
    let mm = d.getMonth() + 1;
    let yyyy = d.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm <10) {
      mm = '0' + mm;
    }

    console.log(`${mm}/${dd}/${yyyy}`);
  }

  remindMe() {
    return "Learning is a life-long pursuit.";
  }

  getContacts() {
    this.clear();
    this.book.getContacts().then((contacts) => {
      for (let contact of contacts) {
        console.log(`
        name: ${contact.name}
        phone number: ${contact.phone}
        email: ${contact.email}
        ---------------`
        );
      }
      this.main();
    }).catch((err) => {
      console.log(err);
      this.main();
    });
  }

}