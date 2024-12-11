Feature: Scenarios to input and validate login page with data Table

    Scenario: Validate user able to login with valid login details
        Given I am in home page
        When I login with the following details
            | username             | password     |
            | nandhu7318@gmail.com | December2024 |
        Then I validate contactlist page is displayed

    Scenario: Validate user not able to login with invalid login details
        Given I am in home page
        When I login with the following details
            | username             | password |
            | nandhu7318@gmail.com | test     |
        Then I validate login error is displayed