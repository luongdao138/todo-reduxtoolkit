import { useEffect, useState } from "react"

interface BreakpointsMap {
    'xs': number,
    'sm': number,
    'md': number,
    'lg': number,
    'xl': number
}

const breakpointsMap: BreakpointsMap = {
     'xs': 0,
     'sm': 600,
     'md': 900,
     'lg': 1200,
     'xl': 1536
}

type Breakpoints = keyof BreakpointsMap
type BreakpointParam = number | Breakpoints

const useMediaQuery = (query: BreakpointParam, isMinWidth = true): boolean => {
    const queryString = convertMediaQuery(query, isMinWidth)
      const getMatches = (query: string) => {
         if(typeof window !== 'undefined') {
              return window.matchMedia(query).matches
         } 

         return false;
        }

      const [match, setMatch] = useState<boolean>(getMatches(queryString));

      const handleMediaChange = () => {
          setMatch(getMatches(queryString))
      }

      useEffect(() => {  
         const matchMedia = window.matchMedia(queryString);

         matchMedia.addEventListener('change', handleMediaChange)
      }, [query, isMinWidth]);


      return match
}

function convertMediaQuery(query: BreakpointParam, isMinWidth: boolean) {
    let width;
    const mediaQueryType = isMinWidth ? 'min-width' : 'max-width';

    if(typeof query === 'number') {
       width = query;     
    } else {
       width = breakpointsMap[query];
    }

    return `(${mediaQueryType}: ${width}px)`;
}

export default useMediaQuery