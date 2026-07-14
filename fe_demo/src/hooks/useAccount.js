import { useAuth } from '../context/AuthContext';

export function useAccount() {
    const { currentUser } = useAuth();
    return currentUser; // { id, sub (email), role, iat, exp }
}