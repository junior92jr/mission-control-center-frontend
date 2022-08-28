# Mission Control Center Frontend

# Getting Started

## Requirements

Main requirements for this project are:

- node: >10.0.0
- npm: >5.8.0

## Usage
To use this seed as a base for your project

* Clone this repository

```
$ git clone git@github.com:junior92jr/mission-control-center-frontend.git
```

* Install dependencies

```
$ yarn install
```

* Test if all works well

  For standalone

  ```
  $ yarn start
  ```

  When integrated to backend (builds dev mode to disk)
 
  ```
  $ yarn watch
  ```
 
  Production build
  
  ```
  $ yarn build
  ```

* Update package.json to use your project name and version

* Push the codebase to your own repository

  ```
  $ git remote remove origin // removing the seed repo as your origin
  ```

  ```
  $ git remote add origin <your git url> 
  ```

  ```
  $ git add -A    // add all files 
  ```

  ```
  $ git commit -m "Initial push"    // commit them
  ```

  ```
  $ git push origin master    // push all to the master branch
  ```

## Builds
### Standalone
To run the frontend on it's own, use the following command

  ```
  $ yarn start
  ```
  
This starts a development server and builds the application in development mode (no obfuscation or minification).
This is not written to disk but done in memory to be very fast.

### Integrated to a backend in development
If you are using Django to serve the frontend, you need to run the build in "watch" mode.
This will use the development style of build (no obfuscation or minification) but writing 

To run in watch mode execute the script:
  ```
  $ yarn start
  ```
this will build the files to the `build` directory and rebuild the files each time a file its saved.
