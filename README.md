# Getting Started My Custom Hook

Available with Reactjs, React Native.

## Usage

In the project directory, you can run:

### `useAsync`

Call a async function into useAsync custom hook, return your to end async function and get your result in ```result```.

Example : \
  ```const { result, isLoad, isError, errorMessage, isCancel } = useAsync (async () => { return ...; }); ```
  ``` 
      result : data return on async function.
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
      result : 
      isLoad : 
      isError :
      errorMessage :
      isCancel :
  ```

