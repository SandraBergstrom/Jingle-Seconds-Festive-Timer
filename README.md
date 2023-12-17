# Festive Timer


[Hero Image]()



# Introduction

Festive Timer is a user-friendly application designed for its users to access the New Year countdown timer appropriate for selected time zones and exciting pieces of trivia about pre-selected countries and places worth visiting.


## Table Of Contents

-   [User Experience Design](#user-experience-design)
    -   [The Strategy Plane](#the-strategy-plane)
        -   [Site Goals](#site-goals)
        -   [Agile planning](#agile-planning)
            - [Epics](#epics)
            - [User stories](#user-stories)
-   [The Scope Plane](#the-scope-plane)
-   [The Structure Plane](#the-structure-plane)
    - [Features](#features)
    - [Planned features](#planned-features)
-   [The Skeleton Plane](#the-skeleton-plane)
    - [Wireframes](#wireframes)
-   [The Surface Plane](#the-surface-plane)
    -   [Colour Scheme](#colour-scheme)
    -   [Imagery](#imagery)
    -   [Fonts](#Fonts)
-   [Testing](#testing)
-   [Technologies and Tools](#technologies-and-tools)
-   [Deployment](#deployment)
    -   [Version control](#version-control)
    -   [Creating A Fork](#creating-a-fork)
    -   [Cloning Repository](#cloning-repository)
-   [Credits](#credits)
    -   [Media](#media)


## User Experience Design

### The Strategy Plane 

#### Site-goals 
* Provide a system to allow a user to get a countdown to New Year based on their geo-location.
* Allow users to access interesting facts about New Year traditions in pre-selected countries.
* Expandable application, according to Hackathon conditions and constraints, where content is displayed based on user selection.

#### Agile planning
The project was developed by using agile methodologies. The development cycle was divided into short sprints, where code was delivered in small chunks for flexibility and good coding practice.
Furthermore, the branch system and forking was used to simulate real-life environment.

The Kanban board was created to keep track of project progression and issues assessment. Issues were given acceptance criteria and were split into tasks.


#### Epics 

1. Base Setup
The base setup epic is for all stories needed for the base setup of the application.

2. UI/UX
The UI/UX epic is for all stories related to prototyping and designing a user-friendly interface.

3. World Map
The World Map epic is for all stories related to the world map and geolocation functionality.

4. Countdown timer
The Countdown timer epic for all stories needed for the countdown logic to work in different time zones.

5. Standalone pages
This epic is for all stories related to small pages and functionalities that don't have their epic.

6. Deployment
This epic is for deployment-related stories.

7. Documentation
This epic is for document-related stories. It provides essential documentation to give an insight into the development process.


### User Stories

 *EPIC 1: Base Setup*
- As a developer, I need to initialise the project to ensure team members can work in the same environment.
- As a developer, I need to create a proper structure so everyone in the team can work independently without accessing the main branch.

 *EPIC 2: UI/UX*
- As a Developer, I want to create mockups or wireframes for the webpage's UI/UX design to visualize its layout and structure.
- As a User, I can navigate between different sections of the website so that I can easily access the information or features I need.

 *EPIC 3: Countdown timer*
- As a user, I want to see a visual countdown timer, so that I can easily understand how much time is left until New Year in my selected location.

 *EPIC 4: World Map*
- As a user, I want to view a world map on the homepage, so that I can easily navigate to different countries and/or cities for their countdowns.

 *EPIC 5: Countries pages*
- As a user, I want to access brief information about each country I select, such as cultural New Year traditions or interesting facts, to learn more about how New Year's is celebrated there.
- As a user, I would like to access the Spain page for a countdown meter and basic information about New Year traditions.
- As a user, I would like to access the Ireland page for a countdown meter and basic information about New Year traditions.
- As a user, I would like to access the India page for a countdown meter and basic information about New Year traditions.
- As a user, I would like to access the Japan page for a countdown meter and basic information about New Year traditions.
- As a user, I would like to access the Greece page for a countdown meter and basic information about New Year traditions.
- As a user, I would like to access the Poland page for a countdown meter and basic information about New Year traditions.

 *EPIC 6: Standalone pages*
- As a developer, I should create a team page introducing authors to application visitors.
- As a User, I want to see a friendly and informative "404" error page when I encounter a broken link or reach a non-existent page on the website.

 *EPIC 7: Deployment*
- As a developer, I have to deploy the project so the users can visit the website and interact with the app

 *EPIC 8: Documentation*
 - As a User and a Developer, I want to have a well-documented README.md file for this project so that I can easily understand its purpose, how to set it up, and how to use it effectively.
- - As a User and a Developer, I want to have a well-documented TESTING.md file for this project so that I can easily understand its purpose, how to set it up, and how to use it effectively.


## The Scope Plane

* Responsive design - website should support devices from 320px and above.
* menu should be accessible from mobile devices.
* Interactive World Map with countdown to New Year for each location.
* Trivia section for countries selected by team members.

## The Structure Plane

### Features

As a User, I want to navigate between different sections of the website so that I can easily access the information or features I need.

### Implementation: 

 *Navigation menu*
 * Navigation menu was implemented across all pages 
 * Menu is present to provide better support for mobile devices

 *Footer story*

### Implementation: 

 **Footer**
* content
 As a user, I want to see a visual countdown timer, so that I can easily understand how much time is left until New Year in my selected location.

### Implementation: 

**Localized countdown timer**
* Countdown timer that corresponds to the user's selection
* Adherence to time zones

As a user, I want to view a world map on the homepage, so that I can easily navigate to different countries and/or cities for their countdowns.

Implementation: 

**World map**
* Interactive World Map that allows user to select every country
* User geolocation functionality  

As a user, I want to access brief information about each country I select, such as cultural New Year traditions or interesting facts, to learn more about how New Year's is celebrated there.

### Implementation:

*Countries pages*
* countdown timer for each country
* information about New Year traditions and noteworthy locations
* animated images

 As a developer, I should create a team page introducing authors to application visitors.

Implementation: 

**Team page**
* basic information about application authors

 As a User, I want to see a friendly and informative "404" error page when I encounter a broken link or reach a non-existent page on the website.

Implementation: 

**Error 404 page** 
* The 404 error page has been implemented to ensure that if one of the pages is mistyped, the user can easily return to any page

### Planned features
- About page for business-oriented purposes

# The Skeleton Plane


# Wireframes


# The Surface Plane

### Colour scheme


### Imagery 

### Fonts



## Testing
Testing documentation can be found [here.](./TESTING.md)

* No automated testing was done.
* All testing was done manually by team members.
* We ran our code through [HTML and CSS W3 schools validators](https://validator.w3.org/)

## Technologies and tools
* HTML
    * The structure of the website.
* CSS
    * Content styling
* JavaScript
    * Application logic
* Bootstrap
    * Structure, styling and interactive elements
* NPM
    * Package manager
* Parcel
    * Application build/development optimization tool
* Gsap
    * Animations
* Luxon 
    * Dates handling 
* Geocoding API
    * Geo-location functionality 
* Secret Santa API 
    * Processing geographical coordinates 
* Photoshop 
    * Creating the mockup images of the website 
* Github
    * Repository hosting
* Git 
    * Version control
* Google Lighthouse
    * Testing of the website
* Google Chrome Developer Tools
    * Testing and debugging
* W3C HTML Validator
    * HTML code validation
* W3C CSS Validator
    * CSS code validation
* Js Hint
    * JavaScript code validation


## Deployment

* [The app was deployed to Github]()
* 

## Issues with deployment
* 
* 
*

### Version control
The website was created in Virtual Studio Code editor, and changes were pushed to the GitHub repository by using bash terminal. 

The following commands were used:

 -git status - This command was used to check files staged and not staged for commit

 -git add <file.extension> -  This command was used to add changes in file/files, with particular names and extensions, to be staged for commit

 -git add . - This command was used to add changes in all files, regardless of name and extension, to be staged for commit

-git commit -m "commit message" - This command was used to commit all staged changes to a local repository

-git push - This command was used to upload all committed locally changes to a GitHub repository

-git pull - This command was used to pull changes from remote repository into local repository

-git checkout- This command was used to switch between branches 


### Creating a fork
1. Navigate to the [repository](https://github.com/SandraBergstrom/team-8)
2. In the top-right corner of the page click on the fork button and select create a fork.
3. You can change the name of the fork and add description 
4. Choose to copy only the main branch or all branches to the new fork. 
5. Click Create a Fork. A repository should appear in your GitHub

### Cloning Repository
1. Navigate to the [repository](https://github.com/SandraBergstrom/team-8)
2. Click on the Code button on top of the repository and copy the link. 
3. Open Git Bash and change the working directory to the location where you want the cloned directory. 
4. Type git clone and then paste the link.
5. Press Enter to create your local clone.


## Credits

### JingleSeconds team members

* Dayana Nashkova
* Oluwaseun Olawunmi Adeoye
* Sandra Bergstrom
* Darrach Barneveld
* Dima Bulavenko
* Bartosz Gębarowski


### Media

Festive Timer application was created for educational purposes only. Their rightful owners own all content, like images, text or any other, used by authors to create this application.

### Honourable mentions

* Vasilica Pavaloi - Code Institute Hackathon team facilitator 
* Code Institute - "Secret Santa: A Holiday Hackathon" event organizer


