# CAPS System

## Phase 2 Requirements

In Phase 2, we’ll be changing the underlying networking implementation of our CAPS system from using node events to using a library called Socket.io so that clients can communicate over a network. Socket.io manages the connection pool for us, making broadcasting much easier to operate, and works well both on the terminal (between servers) and with web clients.

The core functionality we’ve already built remains the same. The difference in this phase is that we’ll be creating a networking layer. As such, the user stories that speak to application functionality remain unchanged, but our developer story changes to reflect the work needed for refactoring.

**User Stories:**
- As a vendor, I want to alert the system when I have a package to be picked up.
- As a driver, I want to be notified when there is a package to be delivered.
- As a driver, I want to alert the system when I have picked up a package and it is in transit.
- As a driver, I want to alert the system when a package has been delivered.
- As a vendor, I want to be notified when my package has been delivered.

**Developer Story:**
- As a developer, I want to create a network event-driven system using Socket.io so that I can write code that responds to events originating from both servers and client applications.

**Technical Requirements / Notes:**
- In order to switch from Node Events to Socket.io, the refactoring process will involve changes to each application to use the core features of Socket.io.

## Overview

The goal of this lab is to create a namespaced Socket.io event server and configure Vendor and Driver Client Modules.

- The Socket Server will create a namespace of `caps` that will receive all CAPS event traffic.
- Each Vendor and Driver Client will connect to the `caps` namespace.
- The server will emit specific events to each socket that is listening for their designated events from the Global Event Pool defined in the Server.
- Each Vendor will only emit and listen for specific events based on their Vendor ID. This will be managed by rooms within Socket.io.
- Each Driver will “pick up” a package when the vendor notifies the Server that an “order” is ready and simulate “in-transit” and “delivered” events.
- The expected output of the 3 running applications is the same as it was in Phase 2.

## Output

Note: This is the heart of refactoring. The end result appears to be the same even after you’ve made a holistic change on the underlying code to be cleaner and faster. As developers, we want to do great work without changing the users’ experience.

## Proposed File Structure

Note: The structure below shows both socket clients and the socket server in the same repo. This is for learning and grading convenience, not a requirement. Realistically, the socket server and each of the socket clients could be independent applications and repos.

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

![Alt text](lab%2012%20CAPS.png)