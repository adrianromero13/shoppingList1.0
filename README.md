# Full MERN Stack Application - Make-A-List

## Description

A simple Todo Application with a straight forward design aimed at an audience that seeks a platform to make a **list**, and _nothing else_. 
The Make-A-List application has full CRUD functionality, which lets the user create and delete lists. It lets the user update the lists by letting them create, update, and delete items in the list, and the list itself. I created this application to test my knowledge of the mechanics of react-hooks, react-hooks-forms, and the component library Material-ui-react.

## Table of Contents
* [Description](#description)
* [Installation-and-Usage](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)

## Installation

> Prerequisites: 
  >> Node.js version (^12.13.1)
  >> npm version (^6.12.1)
  >> MonogoDb for database

> Installation: 
  >> Clone git repository
  >> Open in code editor
  >> Run command: npm i && npm start
  >> Create config.js file and add "secret" text-value pair to run jwt-services

> Usage: 
  >> Node.js runs concurrently with MongoDB,
  >> Application opens in default browser
  >> Click user icon to Sign Up and start

## Usage

Navigate through the application using the **App Bar**.<br/>
On the top right there is a ***user*** icon, which if not signed in, will let you choose 
to <br/>
_Sign Up_ or _Sign In_.<br/> 
If you are already signed up, use the sign in menu item to navigate you to the **Sign In** form,<br/>
otherwise, click the _Sign Up_ menu item to create an account.

**Create A List**
After signing in, there will be a ***Menu Button*** on the left of the **App Bar**.<br/>
Clicking it will open a menu item listed as _Create a list_.<br/> Clicking this will open a Modal with a
a form to assign a title to the new list. Clicking the button on the form will submit and create
the new list.

**Create List Items**
After creating the list, a tab will render with the title of the list as its text.<br/>
Clicking the tab will activate the rendering of the list under or to the right of the screen; 
depending on the width of the viewport.<br/>
An ***Add Button*** will appear on the bottom right. If clicked, a small form will appear.<br/>
After adding the text of your list item, click the _checkmark_ and the list item will appear 
below your list title.

**Updating Items and Lists**
A list item can be marked as _completed_ by hovering over the item,<br/> and clicking its respective
***checkmark***.<br/> Doing so will update your list with the item _crossed out_ to show its completion.<br/>
The item can be marked as not complete by clicking the _checkmark_ of a completed list item.<br/>
The ***Trash*** icon will remove the item from the list completely.<br/>
When A list is active (meaning the list items and title can be seen in the screen),
To the right of the title of the list will be a ***-*** (_remove_) icon.<br/>
Clicking the _remove_ icon will open a modal with the list title and the number of list items in the list.<br/>
Clicking the designated ***Delete*** button on the form will erase the list and its corresponding list items.

## License

[GNU General Public License v3.0](./LICENSE.txt)

## Contributing

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](code_of_conduct.md)

