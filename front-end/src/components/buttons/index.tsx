import { Link } from 'react-router-dom'
import './styles.css'
interface ButtonProps {
    children: React.ReactNode
    onClick: () => void
}

export function Button({ children, onClick }: ButtonProps) {
    return (
        <button onClick={onClick} className="btn-primary">
            {children}
        </button>
    )
}

interface LinkButtonProps {
    to: string
    children: React.ReactNode
}
export function LinkButton({ to, children }: LinkButtonProps) {
    return (
        <Link to={to} className="btn-primary">
            {children}
        </Link>
    )
}
