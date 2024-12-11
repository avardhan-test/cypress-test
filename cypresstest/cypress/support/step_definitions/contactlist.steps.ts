import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ContactListPage } from "../../e2e/page/contactlist.page";
const contactListPage = new ContactListPage();

Then('I validate contactlist page is displayed', () => {
    contactListPage.validateContactListHeaderIsDisplayed();
})

When('I enter firstName as {string} lastName as {string} email as {string} city as {string}', (firstName: string, lastName: string, email: string, city: string) => {
    contactListPage.submitContactList(firstName, lastName, email, city);
})

Then('I validate the contact list {string} {string} is added', (firstName: string, lastName: string) => {
    contactListPage.validateContactListStatus(firstName, lastName, true);
})

When('I delete the contact {string} {string}', (firstName: string, lastName: string) => {
    contactListPage.deleteContact(firstName, lastName);
})

Then('I validate the contact list {string} {string} is deleted', (firstName: string, lastName: string) => {
    contactListPage.validateContactListStatus(firstName, lastName, false);
})