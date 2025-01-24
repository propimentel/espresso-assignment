
**# React Agent Management Application**

This is a React application for managing agent data. 
Users can add new agents, edit existing agents, and delete agents. 
The application also displays a list of all agents with their names, emails, and statuses.

**## Functionalities**

* Add new agents
* Edit existing agents
* Delete agents
* View a list of all agents with names, emails, and statuses

**## Technologies Used**

* React
* Zod (for form validation)
* Local storage (for storing agent data)

**## Running the Application with Docker**

This application can be run using Docker. Here are the steps on how to run the application:

1. **Clone the repository**

```bash
git clone https://github.com/propimentel/espresso-assignment.git
```

2. **Build the Docker image**

```bash
cd espresso-assignment
docker-compose build
```

3. **Run the application**

```bash
docker-compose up
```

This will start the application and expose it on port 5000. 
You can access the application in your web browser at http://localhost:5000.

