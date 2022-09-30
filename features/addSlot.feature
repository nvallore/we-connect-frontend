Feature: Create a Slot

    Create an availability slot as an alumni

    Background: Alumni logs in
        Given a user with role "alumni"
        When the credentials are entered
        And the "Login" button is clicked
        Then the user will be logged in

    Scenario: Create a slot
        Given user navigates to "Profile" section
        And the "Schedule Slots" button is clicked
        When the "Add Slot" button is clicked
        And the date is set
        * the "Submit Slot" button is clicked
        Then a slot is created
        And the "Logout" button is clicked