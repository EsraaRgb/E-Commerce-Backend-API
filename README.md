
<h1 align="center" style="font-weight: bold;">Complaints Analysis API 💻</h1>

<p align="center">
<a href="#tech">Technologies</a>
<a href="#started">Getting Started</a>
<a href="#routes">API Endpoints</a>

 
</p>


<p align="center">The Backend API for an AI-powered Arabic Complaints Handling Portal. It is a web-based platform designed to efficiently manage user complaints. By leveraging machine learning models, the system automatically identifies the relevant departments, categorizes complaints into common topics, and generates insightful analyses. These analyses help in recognizing trending issues, allowing organizations to respond more effectively to customer concerns.</p>


<p align="center">
<a href="https://github.com/EsraaRgb/Complaints-Analysis-API">📱 Visit this Project</a>
</p>

<h2 id="technologies">💻 Technologies</h2>

Backend: Node.js

Database: MySQL

API Testing: Postman

<h2 id="started">🚀 Getting started</h2>

Follow these steps to set up and run the Complaints Analysis Backend API on your local machine.



<h3>Prerequisites</h3>

Before running the project, you need to have the following installed:

- Node.js (version 10 or later)
- XAMPP (or another software package that includes Apache, MySQL, and PHP)
- in cmd `git clone https://github.com/EsraaRgb/Complaints-Analysis-API`
- `cd Complaints_Analysis_System`
- `npm install`
- Start the Apache and MySQL modules in XAMPP. If you are using XAMPP, you can start the modules by opening the XAMPP Control Panel and clicking the "Start" button next to Apache and MySQL.
- Open phpMyAdmin by typing "http://localhost/phpmyadmin" into a web browser. This will open the phpMyAdmin interface in your browser.
- Create a new database by clicking on the "New" button on the left-hand side of the phpMyAdmin interface. Enter `gcp` as your database name.
- run the server by executing the command `npm start`

<h2 id="routes">📍 API Endpoints</h2>

Here you can list the main routes of your API, and what are their expected request bodies.
​Here's how you might structure the "User Management" section in your README file using the table format:

---

## User Management API Endpoints

| Method | Route                           | Description                                                                                         |
|--------|---------------------------------|-----------------------------------------------------------------------------------------------------|
| POST   | `/signup/citizen`                | Registers a new citizen. See [request details](#post-signup-citizen)                               |
| POST   | `/signup/employee`               | Registers a new employee. See [request details](#post-signup-employee)                              |
| GET    | `/confirmEmail/:token`           | Confirms a user's email address. Example: `/confirmEmail/abc123` See [request details](#get-confirm-email) |
| GET    | `/getUsers/:type`                | Retrieves users based on their type. Example: `/getUsers/citizen` See [request details](#get-users) |
| POST   | `/login`                         | Authenticates a user and logs them in. See [request details](#post-login)                           |
| GET    | `/profile`                       | Retrieves the profile of the currently logged-in user. See [request details](#get-profile)         |
| PUT    | `/update`                        | Updates the current user's information. See [request details](#put-update)                         |

---

## Complaint Management API Endpoints

| Method | Route                                     | Description                                                                                         |
|--------|-------------------------------------------|-----------------------------------------------------------------------------------------------------|
| GET    | `/`                                       | Retrieves all complaints for logged in citizen.                                                                          |
| GET    | `/dashboard`                              | Retrieves dashboard data for employees.                                                             |
| PUT    | `/changeState/:id`                        | Changes the state of a complaint by employee.                                                                    |
| GET    | `/employee`                               | Retrieves complaints assigned to logged in employee.                                                          |
| GET    | `/history`                                | Retrieves complaints history for citizen.                                                           |
| GET    | `/sector`                                 | Retrieves sector-specific complaints for employee.                                                   |
| GET    | `/getDate`                                | Retrieves the current date.                                                                         |
| GET    | `/cardsCount`                             | Retrieves the count of cards in admin.                                                                |
| GET    | `/countsForSectorPageAdmin`               | Retrieves counts for sector page in admin.                                                            |
| GET    | `/countofComplaintsInMonths/:name`        | Retrieves the count of complaints by month.                                                           |
| POST   | `/add`                                    | Adds a new complaint.                                                                             |
| PUT    | `/update/:id`                             | Updates an existing complaint.                                                                       |
| DELETE | `/delete/:id`                             | Deletes a complaint.                                                                              |
| GET    | `/heatMapQAuery/:year`                    | Retrieves heatmap query data for a given year.                                                       |
| GET    | `/sentiment/:sector`                      | Retrieves sentiment analysis for a sector.                                                           |
| GET    | `/search`                                 | Searches complaints (admin access).                                                                 |
| GET    | `/search/sector`                          | Searches sector-specific complaints (employee access).                                                |
| GET    | `/cluster/sector`                         | Retrieves complaints clustering by sector.                                                           |
| GET    | `/cluster`                                | Retrieves general complaints clustering.                                                             |
| POST   | `/analysis`                               | Analyzes complaints.                                                                               |
| POST   | `/summary`                                | Summarizes complaints.                                                                             |
| GET    | `/:id`                                    | Retrieves a specific complaint by ID.                                                                |

---

## Tag Management API Endpoints

| Method | Route                            | Description                                      |
|--------|----------------------------------|--------------------------------------------------|
| GET    | `/`                              | Retrieves all tags.                            |
| POST   | `/add`                            | Adds a new tag.                                |
| GET    | `/countComplaintsInTags/:name`    | Retrieves the count of complaints in tags by sector name. |

---

## Cluster Management API Endpoints

| Method | Route                     | Description                                      |
|--------|---------------------------|--------------------------------------------------|
| GET    | `/`                       | Retrieves all clusters.                         |
| GET    | `/sectorClusters/:name`   | Retrieves clusters by sector name.              |
| POST   | `/add`                     | Adds a new cluster.                            |
| PUT    | `/update/:id`              | Updates a specific cluster.                     |
| DELETE | `/delete/:id`              | Deletes a specific cluster.                    |
| POST   | `/confirm`                 | Creates clusters with validation.               |

---

## Complaint Details API Endpoints

| Method | Route                                          | Description                                          |
|--------|------------------------------------------------|------------------------------------------------------|
| GET    | `/`                                            | Retrieves all complaint details.                    |
| GET    | `/complainsInSector/:name`                     | Retrieves the count of complaints in a specific sector. |
| GET    | `/ComplaintsCounts`                           | Retrieves the total count of complaints.            |
| GET    | `/complainsOfClustersInSector/:name`           | Retrieves the count of complaints in clusters within a sector. |
| GET    | `/complainsInClusters/:name`                   | Retrieves the count of complaints in specific clusters. |
| GET    | `/sectorName/:name`                           | Retrieves details of a sector by name.              |
| POST   | `/add`                                        | Adds new complaint details.                        |
| PUT    | `/update/:id/:name`                           | Updates specific complaint details.                |

---
## Comment Management API Endpoints

| Method | Route                            | Description                                      |
|--------|----------------------------------|--------------------------------------------------|
| GET    | `/`                              | Retrieves comments for a citizen.               |
| POST   | `/:id`                            | Adds a new comment to complaint with an attachment.          |

---

## Complaint History API Endpoints

| Method | Route                            | Description                                                |
|--------|----------------------------------|------------------------------------------------------------|
| GET    | `/`                              | Retrieves a complete history of all updates related to complaints. This includes detailed records of changes in complaint status, modifications, comments, and any other relevant updates. |
---

## Complaint Tags API Endpoints

| Method | Route                            | Description                                      |
|--------|----------------------------------|--------------------------------------------------|
| GET    | `/`                              | Retrieves all complaint tags.                   |
| POST   | `/add`                            | Adds a new complaint tag.                       |

---

## Forwarded Complaints API Endpoints

| Method | Route                                      | Description                                                  |
|--------|--------------------------------------------|--------------------------------------------------------------|
| GET    | `/`                                        | Retrieves all forwarded complaints.                         |
| GET    | `/ForwaredTable/table`                     | Retrieves the table of forwarded complaints data.           |
| GET    | `/ForwaredTable/tableChart`                | Retrieves the chart representation of forwarded complaints data. |
| GET    | `/countForwaredComplaintsInSector`         | Retrieves the count of forwarded complaints by sector.      |
| GET    | `/employeeForwardedComplaints`             | Retrieves forwarded complaints specific to employees.        |
| PUT    | `/update/:id`                              | Updates a specific forwarded complaint.                     |
| POST   | `/:id`                                     | Adds a new forwarded complaint.                             |

---

