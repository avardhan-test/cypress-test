import { DataTable } from "@badeball/cypress-cucumber-preprocessor";

export class LoginPage {

    elements = {
        userNameInput: () => cy.get('#email'),
        passwordInput: () => cy.get('#password'),
        submitButton: () => cy.get('#submit'),
        loginError: () => cy.get('#error'),
    }

    login(datatable: DataTable) {
        const loginDetails = datatable.hashes()[0];
        cy.log(JSON.stringify(loginDetails));
        this.submitLoginDetails(loginDetails.username, loginDetails.password);
    }

    validateLoginError() {
        this.elements.loginError().contains('Incorrect username or password');
    }

    loginWithValidDetails() {
        cy.fixture('login').then(login => {
            this.submitLoginDetails(login.username, login.password);
        })
    }

    submitLoginDetails(username: string, password: string) {
        this.elements.userNameInput().type(username);
        this.elements.passwordInput().type(password);
        this.elements.submitButton().click();
    }
}