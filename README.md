# CAPS
# LAB - Class 11

## Project: CAPS

### Author: Student/Group Name
Nick M
### Problem Domain  

Phase 1 Requirements
Today, we begin the first of a 4-Phase build of the CAPS system, written in Node.js. In this first phase, our goal is to setup a pool of events and handler functions, with the intent being to refactor parts of the system throughout the week, but keep the handlers themselves largely the same. The task of “delivering a package” doesn’t change (the handler), even if the mechanism for triggering that task (the event) does.

The following user/developer stories detail the major functionality for this phase of the project.

As a vendor, I want to alert the system when I have a package to be picked up.
As a driver, I want to be notified when there is a package to be delivered.
As a driver, I want to alert the system when I have picked up a package and it is in transit.
As a driver, I want to alert the system when a package has been delivered.
As a vendor, I want to be notified when my package has been delivered.
And as developers, here are some of the development stories that are relevant to the above.

As a developer, I want to use industry standards for managing the state of each package.
As a developer, I want to create an event driven system so that I can write code that happens in response to events, in real time.
### Links and Resources

- [GitHub Actions ci/cd(TBD)](https://github.com/nickmullaney/CAPS/actions) 

# package.json Notes

## For React Applications

To deploy your application at GitHub pages, you'll need to add a home page property to your package.json which points to the deployed base URL of your GitHub Pages site.

*NOTE: This will break deployments to other hosting services such as Netlify, Vercel, or AWS Amplify, so if you later wish to deploy there, remove this property completely.*

```json
{
  "homepage": "https://github.com/nickmullaney/CAPS"
}
```
# To Run

To run the application please use ```node hub.js```

### For Tests

Your scripts section should have the following, so that you can easily run tests locally and in your CI.

```json
  "scripts": {
    "start": "node index.js",
    "test": "jest --verbose --coverage",
    "test-watch": "jest --watchAll --verbose --coverage",
    "init:config": "sequelize init:config",
    "db:create": "sequelize db:create"
},
```

### For NPM Modules

If you are creating a module to deploy at NPM, you'll want a "bin" section that identifies the name of the global command to run and your .js file that runs when called.

```json
"bin": {
    "fetch": "index.js"
}
```

Additionally, that file should have as it's first line, so that it'll run without having to type "node filename.js" every time

`#!/usr/bin/env node`


### Collaborators

Thanks to Reece, Ryan, Ike, Hayden, Kaeden, and Stephen

#### Tests

to run tests after running `npm i`, run the command `npm test` 

#### UML

![image](lab11.png)