import { DataTable, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import { LoginPage } from "../../e2e/page/login.page";
const loginPage = new LoginPage();

Given('I am in home page', () => {
    cy.visit('/');
})

When('I login with the following details', (datatable: DataTable) => {
    loginPage.login(datatable);
})

Then('I validate login error is displayed', () => {
    loginPage.validateLoginError();
})

Given('I login into the application', () => {
    cy.visit('/');
    loginPage.loginWithValidDetails();
})