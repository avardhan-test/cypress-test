Feature: Scenarios to add contact list working as expected

    Scenario Outline: Validate able to add the list of contact
        Given I login into the application
        When I enter firstName as "<firstName>" lastName as "<lastName>" email as "<email>" city as "<city>"
        Then I validate the contact list "<firstName>" "<lastName>" is added

        Examples:
            | firstName      | lastName      | email          | city    |
            | firstNameOne   | lastNameOne   | one@test.com   | London  |
            | firstNameTwo   | lastNameTwo   | two@test.com   | Cardiff |
            | firstNameThree | lastNameThree | three@test.com | Glasgow |

    Scenario Outline: Validate able to delete the list of contact
        Given I login into the application
        When I delete the contact "<firstName>" "<lastName>"
        Then I validate the contact list "<firstName>" "<lastName>" is deleted

        Examples:
            | firstName      | lastName      |
            | firstNameOne   | lastNameOne   |
            | firstNameTwo   | lastNameTwo   |
            | firstNameThree | lastNameThree |