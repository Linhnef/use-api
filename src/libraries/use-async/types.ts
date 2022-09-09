export type AsyncStatus<TResult> = {
  result: TResult | undefined
  isLoad: boolean
  isError: boolean
  errorMessage: any | undefined
  isCancel: boolean
}
export type AsyncHandle<TResult> = AsyncStatus<TResult> & {
  reload: AsyncReload<TResult | undefined>
  resolve: AsyncResolve<TResult | undefined>
  cancel: AsyncCancel
}

export type AsyncAction<TResult> = () => Promise<TResult | undefined> | TResult | undefined
export type AsyncReload<TResult> = (
  action?: AsyncAction<TResult | undefined>
) => Promise<TResult | undefined> | TResult | undefined
export type AsyncResolve<TResult> = (result: TResult) => void
export type AsyncCancel = () => void
export type UseAsync = <TResult>(
  initializer?: AsyncAction<TResult> | TResult,
  dependencies?: any[],
  name? : string,
) => AsyncHandle<TResult>
