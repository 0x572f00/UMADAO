# UMA DAO

## Prerequisites
Ensure that you have Node.js and Yarn installed on your system. You can download the latest version of Node.js from the official website: [https://nodejs.org](https://nodejs.org).

## Installation
1. Clone/download repo
2. from the repo, in the terminal launch `npm install` 

## .env file
You need to create a .env file containing:
REACT_APP_ALCHEMY_API_KEY=alchemyKey

## Usage
**Development**
`yarn start`
* App served @ `http://localhost:3000`

**Create Production**
1. `yarn build` to build app to `/build/`
2. Upload the `/build/` folder at the root of UMA website folder