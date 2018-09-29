## Example of [Tour of Heroes](https://github.com/johnpapa/angular-tour-of-heroes) API

### Requirements
* Install the Node.js
* Install the MongoDB

### Usage
* Install the npm packages  
```
npm install
```
* Launch the server
```
npm start
```

### API Reference

|Endpoint|Method|
|:--|:--|
|/api/heroes|GET|

Sample Response
```json
[
  {
    "id": 1,
    "name": "BLACK WIDOW"
  },
  {
    "id": 2,
    "name": "CAPTAIN AMERICA"
  }
]
```

|Endpoint|Method|
|:--|:--|
|/api/heroes|POST|

Sample Response
```json
{
    "id": 1,
    "name": "BLACK WIDOW"
}
```

|Endpoint|Method|
|:--|:--|
|/api/heroes/:id|GET|

Sample Response
```json
{
    "id": 1,
    "name": "BLACK WIDOW"
}
```

|Endpoint|Method|
|:--|:--|
|/api/heroes/:id|PUT|

Sample Response
```json
{
    "id": 1,
    "name": "FALCON"
}
```

|Endpoint|Method|
|:--|:--|
|/api/heroes/:id|DELETE|

Sample Response
```json
{
    "id": 1,
    "name": "BLACK WIDOW"
}
```
