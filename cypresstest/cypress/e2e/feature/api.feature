Feature: Validate the contact list api is working as expected

Scenario: Validate able to create contact list via api
    Given I have the api url
    When I "post" the contact
    Then I see the user "post" response sucessfully

Scenario: Validate able to update contact list via api
    Given I have the api url
    When I "patch" the contact
    Then I see the user "patch" response sucessfully

Scenario: Validate able to delete contact list via api
    Given I have the api url
    When I "delete" the contact
    Then I see the user "delete" response sucessfully