import { useState } from 'react';
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Changed to false instead of null
    const { dispatch } = useAuthContext();

    const signup = async (email, password, userName, fullName, courses) => {
        if (!email || !password || !userName || !fullName || !courses) {
            console.log('fields not fully filled out');
            setError('All fields must be filled out');
            return { error: 'All fields must be filled out' };
        }

        setIsLoading(true);
        setError(null);
        console.log(JSON.stringify({ email, password, userName, fullName, courses }));

        const response = await fetch('/api/user/signup', { // backend/routes/users
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, userName, fullName, courses })
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
            return { error: json.error }; // Return the error for handling in the component
        }

        if (response.ok) {
            // Save user to local storage
            localStorage.setItem('user', JSON.stringify(json));
            localStorage.setItem('userId', json.userId);
            console.log(localStorage.getItem('userId'));

            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
