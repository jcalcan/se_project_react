https://jcalcan.github.io/se_project_react/

# Project 10: What to Wear Weather App (WTWW)

### Overview

- Intro
- Figma
- Tech used
- Description and functionality
- Github link
- Backend Express server
- Images

**Intro**

WTWW is a project displaying the power of React combined with express.js server API's and an external weather API tied to a back-end MongoDB. All React components are displayed correctly on popular screen sizes using css grid and very minimal media queries. The app determines clothing suggestions based on public weather data. Enjoy.

**Figma**

- [Link to the project on Figma](https://www.figma.com/design/F03bTb81Pw8IDPj5Y9rc5i/Sprint-10-%7C-WTWR?node-id=311-433&p=f&t=mVKXRi7p8WCtvag4-0)

**Tech used**

This project was fun and challenging. React was used for the responsive design along with css display grid. React hooks were maximized to increase loading and performance. Bandwith, server strain, mobile performance are all taken into account when designing the app. This app was built with and MVC (Model-View-Controller) Architecture in mind. The user interacts with the application through the View when registering, logging in/out, adding, liking, disliking, and deleting items with the front-end UI. The View captures the user info and sends it to the controller. The Controller receives the info (name, email, password, avatar), clothing Items and processes it (validates inputs and determines actions to take) to interact with the model. The Model is actually mongoose and mongoDB. Mongoose creates the model for the documents which define the data structures and business logic, and interacts with MongoDB - the database. MongoDB stores the data. These are the steps of the data flow.

[1.] React (View) sends requests to -------> Express.js (Controller);
[2.]Express.js processes requests, uses the Model (Mongoose + MongoDB) to access or modify data;
[3.]The Model interacts with MongoDB and returns data to the Controller;
[4.]The Controller sends data back to the View

This separation keeps the application organized, scalable, and maintainable.

**Description and Functionality**
WTWW is a site that provides suggestions based on the local weather conditions. You can upload garments of any type as a "digital closet' to help you save time choosing what to wear daily weather based. The site is designed to function on any browser- mobile or desktop. No need to install special extensions. Plans to improve the project includes user database management, archiving garments feature, adding location services to determine user location.

**Github link**
[old project] https://jcalcan.github.io/se_project_react/
[updated project with back-end] https://github.com/jcalcan/se_project_react

**Express Server Link**
[sprint 13 WTWR backend Server link](https://github.com/jcalcan/se_project_express/)

**Images and screenshots**
Photo showcase of the design of the site in different dimensions for various devices. For example,
for mobile devices it would look like this - ![mobile](./src/assets/WTWR%20mobile%20logged%20in%20homepage.jpg). For tablets like this ![tablets](./src/assets/WTWR%20tablet%20logged%20in%20homepage.jpg) and regular desktops like this ![desktop](./src/assets/WTWR%20desktop%20logged%20out%20homepage.jpg). ![loggedin Desktop](./src/assets/WTWR%20desktop%20logged%20in%20homepage.jpg)The design and code were made with React and intuitive to users devices in mind. Easy to use, read and navigate were top priority elevating the users experience with the app.

Good luck and have fun!
