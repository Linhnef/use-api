

  import { debounce } from "@mui/material"
  import { ReactNode, RefObject, useEffect, useRef } from "react"
  import styled from "styled-components"


export enum ScrollDirection {
    Top = "TOP",
    Bottom = "BOTTOM",
  }
  export type PageInfiniteScrollerProps = {
    onLoad: () => void
    isLoading: boolean
    hasMoreItems: boolean
    children: ReactNode
    loader: ReactNode
    direction?: ScrollDirection
    onScroll?: (scrollTop: number) => void
    parentRef?: RefObject<HTMLDivElement> | null
  }
  
  export const PageInfiniteScroller = (props: PageInfiniteScrollerProps) => {
    const {
      onLoad,
      isLoading,
      hasMoreItems,
      children,
      loader,
      direction = ScrollDirection.Bottom,
      onScroll,
      parentRef,
    } = props
    const innerContainerRef = useRef<HTMLDivElement>(null)
    const containerRef = parentRef ?? innerContainerRef
    const baseScrollHeight = 50
  
    const shouldLoad = () => {
      if (!containerRef.current || isLoading || !hasMoreItems) return false
  
      return direction === ScrollDirection.Top
        ? containerRef.current.scrollHeight <=
            -containerRef.current.scrollTop + containerRef.current.offsetHeight + baseScrollHeight
        : containerRef.current.scrollHeight <=
            containerRef.current.scrollTop + containerRef.current.offsetHeight + baseScrollHeight
    }
  
    const handleScroll = debounce(() => {
      if (shouldLoad()) onLoad()
      if (!onScroll) return
      onScroll(containerRef.current?.scrollTop ?? 0)
    }, 100)
  
    useEffect(() => {
      containerRef.current?.addEventListener("scroll", handleScroll)
      return () => containerRef.current?.removeEventListener("scroll", handleScroll)
    }, [onLoad, handleScroll])
  
    return (
      <Root ref={innerContainerRef} $scrollDirection={direction}>
        {children}
        {isLoading && loader}
      </Root>
    )
  }
  
  const Root = styled.div<{ $scrollDirection: ScrollDirection }>`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: ${(p) => (p.$scrollDirection === ScrollDirection.Top ? "column-reverse" : "column")};

  `