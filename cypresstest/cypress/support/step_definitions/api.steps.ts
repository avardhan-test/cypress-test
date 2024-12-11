import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const newContact = {
  firstName: "John",
  lastName: "Doe",
  birthdate: "1970-01-01",
  email: "jdoe@fake.com",
  phone: "8005555555",
  street1: "1 Main St.",
  street2: "Apartment A",
  city: "Anytown",
  stateProvince: "KS",
  postalCode: "12345",
  country: "USA",
};

const updateContact = {
    firstName: "update",
}

Given("I have the api url", () => {
  cy.wrap('https://thinking-tester-contact-list.herokuapp.com/contacts/').as("apiurl");
  cy.fixture("login").then((loginData) => {
    // Send POST request to log in and store the response as alias
    cy.request({
      method: "POST",
      url: "https://thinking-tester-contact-list.herokuapp.com/users/login",
      body: {
        email: loginData.username, // Use username from the loaded JSON
        password: loginData.password, // Use password from the loaded JSON
      },
      headers: {
        "Content-Type": "application/json", // Ensure the content type is JSON
      },
    }).as("loginResponse"); // Store the response as alias
  });
});

When("I {string} the contact", (methodType: string) => {
  cy.get('@loginResponse').then((response: any) => {
    const token = response.body.token;
    if(methodType.toLowerCase() !== "post") {
        cy.request({
            method: 'GET',
            url: 'https://thinking-tester-contact-list.herokuapp.com/contacts/',
            headers: {
              'Authorization': `Bearer ${token}`, // Pass the token for authorization
            },
        }).as('getresponse');
        cy.get('@getresponse').then((getresponse: any) => {
            cy.wrap(`https://thinking-tester-contact-list.herokuapp.com/contacts/${getresponse.body[0]._id}`).as('apiurl');
        })
    }
    cy.get('@apiurl').then((apiurl: any) => {

        let requestBody: any;
        // Determine the request body based on methodType
        if (methodType.toLowerCase() === "post") {
          requestBody = newContact; // Use newContact for POST
        } else if (methodType.toLowerCase() === "patch") {
          requestBody = updateContact; // Use updateContact for PATCH
        } else if (methodType.toLowerCase() === "delete") {
          requestBody = undefined; // DELETE doesn't need a body
        }

        cy.log(methodType.toUpperCase());
        cy.log(apiurl);
        cy.log(token);
        cy.log(requestBody);
  
        cy.request({
            method: methodType.toUpperCase(),
            url: apiurl,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: requestBody
        }).as('response');
    })
  });
});


Then('I see the user {string} response sucessfully', (methodType: string) => {
    let responseStatus = methodType.toLowerCase() === "post" ? 201 : 200;
    let responseFirstName = methodType.toLowerCase() === "post" ? newContact.firstName : updateContact.firstName;
    cy.get('@response').then((response: any) => {
        if(methodType.toLowerCase() === "delete") {
            expect(response.body).to.eq('Contact deleted');
        } else {
            expect(response.body.firstName).to.eq(responseFirstName);
            expect(response.body.lastName).to.eq(newContact.lastName);
        }
        expect(response.status).to.eq(responseStatus);
    })
})