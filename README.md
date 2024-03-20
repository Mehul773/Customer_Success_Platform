# Customer Success Platform

![image](https://github.com/Mehul773/Customer_Success_Platform/assets/114020671/467f7ff3-76b9-45c9-9597-3201ed966084)
![image](https://github.com/Mehul773/Customer_Success_Platform/assets/114020671/e2822fe8-f990-46b8-bf50-d987f8959bc1)
![image](https://github.com/Mehul773/Customer_Success_Platform/assets/114020671/64822120-951d-4580-81fc-c49982813944)

## Live Demo

Access the live demo [here](https://ec2-3-110-223-48.ap-south-1.compute.amazonaws.com:3000/).

## Overview

The Customer Success Platform is a comprehensive web application built using the MERN stack, designed to streamline communication and management processes between stakeholders involved in various projects.

## Why Customer Success Platform?

The Customer Success Platform addresses several key objectives:

1. **Enhanced Communication:** Improving transparency and keeping stakeholders informed about updates and changes within the system.
2. **Efficiency:** Automating notification processes to save time and effort compared to manual methods.
3. **Improved Stakeholder Engagement:** Providing timely updates to increase stakeholder engagement and satisfaction.
4. **Competitive Advantage:** Offering a transparent and responsive communication process to differentiate from competitors.

## Functionality

### Role Based Management

#### Admin Role

- **Credentials:**
  - Email: admin2003@gmail.com
  - Password: Mehul@1234
- Full access to create/update/read/delete all projects and sections.
- Manage users (all stakeholders).

#### Auditor Role

- **Credentials:**
  - Email: auditor2003@gmail.com
  - Password: Mehul@1234
- Register using Microsoft credentials via Auth0.
- Access project management features.
- Assign project managers.
- Add stakeholders and view platform for all projects.

#### Project Manager Role

- Register using Microsoft credentials via Auth0.
- Manage content for assigned projects.
- Save and submit updates for assigned projects.

#### Other Stakeholders

- View customer success platform for assigned projects.

### Email Notification System

A system to send email notifications to stakeholders for updates and changes within the platform.

### Export as a Document

Implement functionality to export project details as a document in a predefined format.

## Technology Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Getting Started

To get started with the Customer Success Platform, follow these steps:

### Server Setup

1. Move to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

### Client Setup

1. Move to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Start the client: `npm start`

## Additional Information

For more details and documentation, visit our [GitHub repository](https://github.com/Mehul773/Customer_Success_Platform.git).

## Credits

This project is developed by Mehul Chovatiya.
