import { ContactDetailsPage } from "./contactdetails.page";
const contactDetailsPage = new ContactDetailsPage();

export class ContactListPage {

    elements = {
        contactListHeader: () => cy.get('h1').contains('Contact List'),
        addNewContactButton: () => cy.get('#add-contact'),
        firstNameInput: () => cy.get('#firstName'),
        lastNameInput: () => cy.get('#lastName'),
        emailInput: () => cy.get('#email'),
        cityInput: () => cy.get('#city'),
        submitButton: () => cy.get('#submit'),
        contactListTable: () => cy.get('#myTable'),
    }

    validateContactListHeaderIsDisplayed() {
        cy.url().should('contain', 'contactList');
        this.elements.contactListHeader().should('be.visible');
    }

    submitContactList(firstName: string, lastName: string, email: string, city: string) {
        this.elements.addNewContactButton().click();
        this.elements.firstNameInput().type(firstName);
        this.elements.lastNameInput().type(lastName);
        this.elements.emailInput().type(email);
        this.elements.cityInput().type(city);
        this.elements.submitButton().click();
    }

    validateContactListStatus(firstName: string, lastName: string, status: boolean) {
        if( status === true ) {
            this.elements.contactListTable().find('tr > td:nth-child(2)').should('contain.text',`${firstName} ${lastName}`);
        } else {
            this.elements.contactListTable().find('tr > td:nth-child(2)').should('not.contain.text', `${firstName} ${lastName}`);
        }
    }

    deleteContact(firstName: string, lastName: string) {
        this.validateContactListHeaderIsDisplayed();
        this.elements.contactListTable().find('tr > td:nth-child(2)').contains(`${firstName} ${lastName}`).click();
        contactDetailsPage.elements.deleteContactButton().click();
        this.validateContactListHeaderIsDisplayed();
    }
}