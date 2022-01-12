import { useSelector } from 'react-redux'
import { userSelector } from 'store/user'

export default function useCurrentUser() {
    const user = useSelector(userSelector)
    return user
}
