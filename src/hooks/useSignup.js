import { useState } from 'react'
import { useAuthContext } from "./useAuthContext"

 export const useSignup = () => {
    const [error, setError ] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, userName, fullName, age, courses) => {
        setIsLoading(true)
        setError(null)
        console.log(JSON.stringify({email, password, userName, fullName, age, courses}))
        const response = await fetch('/api/user/signup', { //backend/routes/users
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, userName, fullName, age, courses})
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // savc user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            localStorage.setItem('userId', json.userId)
            
            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return {signup, isLoading, error}
 }