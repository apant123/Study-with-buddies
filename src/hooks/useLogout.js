import { useAuthContext } from "./useAuthContext"

export const useLogout = () =>{
    const {dispatch} = useAuthContext()

    const logout = () =>{
        // take out the user from storage
        localStorage.removeItem('user')
    
        dispatch({type:'LOGOUT'})
    }

    return {logout}
}