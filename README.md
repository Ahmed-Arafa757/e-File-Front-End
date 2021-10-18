# Technologies used
- Angular
- Nodejs
- Express
- MongoDB

# Packages Used
* Front-End
- bootstrap
- font-awesome

# Packages Used
* Back-End
- dotenv
- express
- jwt
- mongoose
- nodemon


# Project description
* The project consists of a header and four pages [Login, Contacts list, not Authenticated Page, Error404] 

- Header contains: 
    - Logo and logout button to log the current user out and go back to login page
    
- Login page contains:
    - two inputs for user name and password (validated and token sent upon succesful login to handle Authorization inside the app)

- Contacts list page contains:
    - two search filters (filter by name & phone) 
    - Contacts listing for display Contacts (got paginated from server side)
    - Each Contact card contains:
        - placeholder image 
        - name, phone number, address, notes per each contact
        - two icons (edit & delete contact) edit and delete via pop up dialogues and confirmation required for delete dialogue
    - "Add New Contact" button to add new contact to the grid
    - pagination to surf through different pages 

- not Authenticated page contains:
    - text to indicate that the user is not logged 
    - link to login page

- Error page contains:
    - '404 page not found' text 
    - link to go back