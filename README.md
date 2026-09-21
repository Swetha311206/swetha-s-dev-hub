# Swetha's Dev Hub

Build a complete **dynamic personal portfolio website with frontend and backend** for **Swetha G**, a Computer Science and Engineering student.

The website must be a real working full-stack web application, not just a static HTML portfolio.

## 1. Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript ES6+
* Bootstrap 5 if required
* Font Awesome or another icon library

### Backend

* Java
* Java Servlet
* JSP
* JDBC

### Database

* MySQL

### Server

* Apache Tomcat

Use Maven if possible for dependency management.

Project structure should be suitable for running in **IntelliJ IDEA / Eclipse / NetBeans with Apache Tomcat**.

---

# 2. Personal Information

Name: Swetha G

Role:
Computer Science and Engineering Student | Java Developer | Full-Stack Developer

Email:
[swethaswetha43814@gmail.com](mailto:swethaswetha43814@gmail.com)

Phone:
+91-9655613449

LinkedIn:
https://www.linkedin.com/in/swetha-g-07013136a

GitHub:
https://github.com/Swetha311206

LeetCode:
https://leetcode.com/u/Swetha31/

---

# 3. Career Objective

Passionate and motivated Computer Science and Engineering student with strong foundations in Java and OOPs. Possesses hands-on offline internship experience in Frontend Web Development and experience building interactive full-stack web applications. Seeking software development opportunities to solve real-world problems.

---

# 4. Education

### Bachelor of Engineering – Computer Science and Engineering

Kamaraj College of Engineering and Technology
2024–2028
CGPA: 8.12

### Higher Secondary Certificate – HSC

Government Higher Secondary School
2023–2024
Percentage: 87%

### Secondary School Leaving Certificate – SSLC

Government Higher Secondary School
2021–2022
Percentage: 89%

---

# 5. Technical Skills

Programming:

* Java

Web Technologies:

* HTML5
* CSS3
* JavaScript ES6+

Database:

* MySQL

Concepts:

* Object-Oriented Programming
* Data Structures – Basics

Tools:

* VS Code
* IntelliJ IDEA

Soft Skills:

* Logical Problem Solving
* Dynamic Adaptability
* Active Self-Learning
* Professional Teamwork
* Effective Communication

---

# 6. Internship

### Frontend Development Intern

Mist Software Solutions, Coimbatore

Duration:
15 Days – 2025

Type:
Offline Intensive Program

Description:
Gained hands-on experience in building structured and semantic web layouts using HTML5 and CSS3 based on project requirements.

---

# 7. Projects

## Uzhavan Connect – Farmers Direct Digital Marketplace

Year:
2026 – Present

Type:
Agri-Tech Social Impact Full-Stack Project

Technologies:
Java, MySQL, HTML5, CSS3, JavaScript

Description:
Developed a full-stack e-commerce marketplace enabling rural farmers to list their agricultural products directly and allowing users to search and filter crop information dynamically.

Create this as the main highlighted project.

---

## Bank Management System

Year:
2025

Type:
Console-Based Software Application

Technologies:
Java, OOPs, Exception Handling

Description:
Built a terminal-based banking application using Java, object-oriented programming, encapsulation, and exception handling to manage user accounts and core banking transactions.

---

## Library Management System

Year:
2025

Type:
Console-Based Software Application

Technologies:
Java, Object-Oriented Programming

Description:
Designed an object-oriented library management application for book inventory, registration, member borrowing records, and search functionality.

---

# 8. Certifications

* Java Foundation Certification – Infosys Springboard
* Programming Using Java – Infosys Springboard

---

# 9. Achievements

* Secured 1st Place / Championship Title in the State-Level Silambam Competition held at Nehru Stadium, Madurai.
* Completed a 15-day intensive offline Frontend Development internship at Mist Software Solutions.
* Developed a full-stack social-impact agri-tech marketplace using Java and relational database concepts.

---

# 10. Website Pages

Create the following pages/sections:

1. Home
2. About
3. Education
4. Skills
5. Internship
6. Projects
7. Certifications
8. Achievements
9. Contact
10. Admin Login
11. Admin Dashboard

The main portfolio should use a clean single-page layout with smooth navigation, while admin functionality should use separate JSP pages.

---

# 11. Home Page

Create a professional hero section:

"Hi, I'm Swetha G"

"Computer Science Student | Java Developer | Full-Stack Developer"

Description:

"Passionate about building practical software solutions, learning new technologies, and solving real-world problems through technology."

Buttons:

* View My Projects
* Contact Me

Add clickable:

* GitHub
* LinkedIn
* LeetCode

Add a professional profile illustration/avatar area without inventing personal photographs.

---

# 12. About Section

Create a concise professional About section based only on the information provided.

Highlight:

* Computer Science education
* Java
* OOP
* Web development
* MySQL
* Problem solving
* Self-learning
* Interest in software development

---

# 13. Skills Section

Display technical skills in attractive cards.

Categories:

Programming
Web Development
Database
Concepts
Tools
Soft Skills

Do not use fake percentages such as "Java 95%" because no such information is provided.

---

# 14. Projects Section

Create modern project cards.

Each card must contain:

* Project name
* Year
* Project type
* Description
* Technologies
* GitHub button
* Live Demo button where applicable

Add hover animations.

Make Uzhavan Connect the featured project.

---

# 15. Dynamic Backend Feature

The website MUST contain a real backend feature using:

Java Servlet + JSP + JDBC + MySQL.

Implement a **Contact Message Management System**.

When a visitor submits the contact form:

Name
Email
Subject
Message

the data must be sent to a Java Servlet.

Example:

ContactServlet.java

The servlet should:

1. Receive POST request.
2. Validate the input.
3. Connect to MySQL using JDBC.
4. Insert the message into the database.
5. Redirect to a success page.
6. Display a proper success/error message.

Do NOT use only JavaScript/localStorage for this feature.

The data must actually be stored in MySQL.

---

# 16. MySQL Database

Create a database:

portfolio_db

Create table:

contact_messages

Columns:

id
name
email
subject
message
submitted_at

Use appropriate data types.

Provide the complete SQL script.

Example structure:

CREATE DATABASE portfolio_db;

USE portfolio_db;

CREATE TABLE contact_messages (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
email VARCHAR(150) NOT NULL,
subject VARCHAR(200),
message TEXT NOT NULL,
submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---

# 17. Admin Login

Create an Admin Login page.

Fields:

Username
Password

Use a Java Servlet for login processing.

Do not hard-code the complete dashboard functionality only in JavaScript.

Use session management.

Example:

AdminLoginServlet.java

After successful login:

redirect to:

admin-dashboard.jsp

After logout:

invalidate the session and return to login page.

For this college project, use a simple database-based admin authentication system.

---

# 18. Admin Dashboard

Create a professional dashboard where the administrator can:

* View contact messages
* View message details
* Delete messages
* Logout

Display contact messages in a responsive table:

ID | Name | Email | Subject | Message | Date | Action

Actions:

View
Delete

Implement Delete using a Java Servlet and JDBC.

Example:

DeleteMessageServlet.java

---

# 19. Backend Classes

Create clean Java classes such as:

DBConnection.java

Contact.java

ContactDAO.java

ContactServlet.java

AdminLoginServlet.java

DeleteMessageServlet.java

LogoutServlet.java

Use the DAO pattern for database operations.

Do not place all database logic inside JSP pages.

---

# 20. JSP Pages

Create:

index.jsp
contact.jsp
success.jsp
admin-login.jsp
admin-dashboard.jsp

Use JSP Expression Language/JSTL where appropriate.

Avoid Java scriptlets inside JSP wherever possible.

---

# 21. Servlet Mapping

Use annotations such as:

@WebServlet("/contact")
@WebServlet("/admin-login")
@WebServlet("/admin-dashboard")
@WebServlet("/delete-message")
@WebServlet("/logout")

Ensure all mappings work correctly with Tomcat.

---

# 22. JDBC

Use MySQL Connector/J.

Create a reusable database connection class.

Use:

PreparedStatement

for all SQL queries.

Do not concatenate user input directly into SQL queries.

Use try-with-resources wherever appropriate.

Handle SQLException properly.

---

# 23. Validation

Frontend validation using JavaScript:

* Name cannot be empty
* Email must have valid format
* Subject cannot be empty
* Message cannot be empty

Backend validation must also be performed in the Servlet.

Never rely only on JavaScript validation.

---

# 24. Security

Implement basic security practices:

* PreparedStatement to prevent SQL injection
* Session-based admin authentication
* Server-side validation
* Password should not be displayed
* Logout should invalidate the session
* Do not expose database credentials in JSP pages

For the college demonstration, keep the authentication implementation simple and understandable.

---

# 25. UI Design

Create a modern professional student portfolio.

Design style:

* Clean
* Minimal
* Professional
* Modern
* Responsive
* Attractive but not overly flashy

Use a dark navy/blue professional theme with suitable accent colors.

Include:

* Sticky navbar
* Smooth scrolling
* Responsive navigation
* Mobile hamburger menu
* Hover effects
* Project animations
* Scroll reveal animations
* Back-to-top button
* Professional footer

Make the website look suitable for a Java/software developer portfolio.

---

# 26. Responsive Design

The website must work properly on:

* Desktop
* Laptop
* Tablet
* Mobile

Use CSS media queries.

---

# 27. Folder Structure

Create a clear project structure similar to:

portfolio/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/swetha/portfolio/
│       │       ├── DBConnection.java
│       │       ├── Contact.java
│       │       ├── ContactDAO.java
│       │       ├── ContactServlet.java
│       │       ├── AdminLoginServlet.java
│       │       ├── DeleteMessageServlet.java
│       │       └── LogoutServlet.java
│       │
│       └── webapp/
│           ├── index.jsp
│           ├── contact.jsp
│           ├── success.jsp
│           ├── admin-login.jsp
│           ├── admin-dashboard.jsp
│           ├── css/
│           │   └── style.css
│           ├── js/
│           │   └── script.js
│           └── WEB-INF/
│               └── web.xml
│
└── pom.xml

If using Maven, configure the project correctly for Apache Tomcat.

---

# 28. Important Output Requirements

Generate the COMPLETE working project.

Do not provide incomplete snippets.

Provide:

1. Complete frontend code
2. Complete JSP files
3. Complete Java Servlet code
4. Complete JDBC code
5. Complete DAO code
6. Complete MySQL SQL script
7. Complete CSS
8. Complete JavaScript
9. pom.xml
10. Project folder structure
11. Setup instructions
12. How to configure MySQL
13. How to configure Apache Tomcat
14. How to run the project
15. How to test the contact form
16. How to access the admin dashboard

Make sure all file names, package names, servlet mappings, database table names, and URLs are consistent.

Do not use placeholder code such as "add your code here".

The final result must be a complete working Java Servlet/JSP + MySQL portfolio project suitable for a college Internet Programming assignment and also usable as a real personal portfolio.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/40eaed0f-f685-5e0d-80aa-d3209e4c5e7a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
