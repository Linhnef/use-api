# Getting Started My Custom Hook

Available with Reactjs, React Native, Nextjs,... .

## Usage

In the project directory after clone, you can run:
```$ npm start```

### `useAsync`

Call a async function into useAsync custom hook, return your to end async function and get your result in ```result```.

Example : \
  ```const { result, isLoad, isError, errorMessage, isCancel } = useAsync(async () : T => { return ...; }); ```
  ``` 
      result : data return on async function with type T.
      isLoad : is network pending response.
      isError : is request error.
      errorMessage : message error from server.
      isCancel : is cancel reload api.
  ```
### `useAction`

Call a async function into useActioncustom hook, return your to end async function and get your result in ```result```.

Example : \
  ```const { result, isRunning, isError, errorMessage, resolve, run } = useAction (async () => { return ...; }); ```
  ``` 
        result: data return on async function with type T.
        isRunning: is network pending response.
        errorMessage: message error from server.
        isError: is request error.
        resolve: replace result with new data type T.
        run: run with async function arguments.
  ```
  
 ### `Example useAsync`
  Run :
  ```
      const asyncFuction = () => axios.get('/getExample')
      const { result, isLoad, isError, errorMessage, isCancel } = useAsync(async () => {
        const response = await asyncFuction();
        if (response) {
          return response;
        }
      })
  ```
 ### `Example useAction`
 Init :
  ```
      const asyncFuction = () : any[] => axios.get('/getExample/page1')
      const { result, isRunning, isError, errorMessage, resolve, run } = useAction(async () => {
        const response = await asyncFuction();
        if (response) {
          return response;
        }
      })
  ```
 Run :
  ```
      run();
  ```
 Resolve :
  ```
       const asyncFuction = () : any[] => axios.get('/getExample/page2')
       const { result as moreResult } = useAsync(async () => {
       const response = await asyncFuction();
          if (response) {
            return response;
          }
        })
      resolve([...result, ...moreResult]);
  ```
  
  

