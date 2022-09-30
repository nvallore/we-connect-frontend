Feature: Login

    Test to check whether login functionality works

    Scenario Outline: User login with different roles
        Given a user with role "<role>"
        When the credentials are entered
        And the "Login" button is clicked
        Then the user will be logged in
        And the "Logout" button is clicked
        Examples:
            | role    |
            | student |
            | alumni  |