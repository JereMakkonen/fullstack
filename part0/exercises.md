## Exercise 0.4

Creating a new note on the "old" version of the notes app

```mermaid
  sequenceDiagram
      participant browser
      participant server

      browser->>server: Send new note to server
      activate server
      server-->>browser: HTTP 302, URL redirect to /notes
      deactivate server

      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
      activate server
      server-->>browser: HTML document
      deactivate server

      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
      activate server
      server-->>browser: the css file
      deactivate server

      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
      activate server
      server-->>browser: the JavaScript file
      deactivate server

      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
      activate server
      server-->>browser: json data
      deactivate server
```
## Exercise 0.5

Loading the SPA version of the notes app

```mermaid
  sequenceDiagram
      participant browser
      participant server

      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
      activate server
      server-->>browser: HTML document
      deactivate server

      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
      activate server
      server-->>browser: the css file
      deactivate server

      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
      activate server
      server-->>browser: the JavaScript file
      deactivate server

      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
      activate server
      server-->>browser: json data
      deactivate server
```
## Exercise 0.6

Creating a new note on the SPA version of the notes app

```mermaid
  sequenceDiagram
      participant browser
      participant server

      browser->>server: Send new note to server
      activate server
      server-->>browser: HTTP 201 Created
      deactivate server

      Note right of browser: Notes list is rerendered instead of reloading the page
```