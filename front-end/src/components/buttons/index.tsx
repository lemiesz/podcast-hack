import { Link } from 'react-router-dom'
import './styles.css'
interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    secondary?: boolean
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
    form?: string
}

export function Button({
    type,
    children,
    onClick,
    secondary,
    form,
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            form={form}
            className={`${secondary ? 'btn-secondary' : 'btn-primary'}`}
        >
            {children}
        </button>
    )
}

interface LinkButtonProps {
    to: string
    children: React.ReactNode
    secondary?: boolean
}
export function LinkButton({ to, secondary, children }: LinkButtonProps) {
    return (
        <Link
            to={to}
            className={`${secondary ? 'btn-secondary' : 'btn-primary'}`}
        >
            {children}
        </Link>
    )
}
