import { useAuthContext } from "./useAuthContext"

export const useLogout = () =>{
    const {dispatch} = useAuthContext()

    const logout = () =>{
        // take out the user in local storage
        localStorage.removeItem('user')
    
        dispatch({type:'LOGOUT'})
    }

    return {logout}
}