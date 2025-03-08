# PKI

This repositorium contains source code of the aplication developed in the Introduction to User Interfaces course.

## Technologies

Aplication was developed using Angular 18 as the frontend framework.

Libraries used:

- [Angular Material](https://material.angular.io/)
- [Sweet Alerts 2](https://sweetalert2.github.io/)

## Structure

Source code uses the standard structure of an Angular project without `app.modules.ts`. All the necessary modules are imported directly into the components which they are used by.

Loren ipsum:

- `src/app` - Main folder containing all other components
- `src/models` - Folder containing definitions of the types neccessary for a faster app development
- `src/services` - Folder containing defitions of the services needed for running the aplication

## Aditional information

Aplication uses _Angular Router_ which requires that every path be redirected to the `index.html` page, because the routes are defined in the program itself, and not by existing files.
