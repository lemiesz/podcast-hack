interface ButtonProps {
    children: React.ReactNode
    onClick: () => void
}
export function Button({ children, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="bg-purple-600 hover:bg-purple-800 hover:shadow-md rounded-md text-white p-2"
        >
            {children}
        </button>
    )
}
