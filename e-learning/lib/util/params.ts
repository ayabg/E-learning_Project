export function getParams(pathname: string | null): URLSearchParams{
    const urlParts = pathname?.split("?") || ""
    const queryString = urlParts[1] 
    if(pathname){
        const params = new URLSearchParams(queryString)
        return params
    }else{
        return new URLSearchParams("")
    }
}