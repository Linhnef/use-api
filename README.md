# Getting Started My Custom Hook

Available with Reactjs, React Native.

## Usage

In the project directory, you can run:

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

