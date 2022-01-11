/**
 * A react table component written in tailwind css. It has a black bar on top,
 * with a label. It renders it children below.
 */

interface LabelTableProps {
    label: string
    children: React.ReactNode | React.ReactNode[]
    footer?: React.ReactNode | React.ReactNode[]
    className?: string
}
export default function LabelTable({
    label,
    children,
    className,
    footer,
}: LabelTableProps) {
    return (
        <div
            className={`flex flex-col border-2 border-gray-400 rounded-lg ${className}`}
        >
            <h2 className="text-white bg-gray-800 text-2xl font-bold p-5">
                {label}
            </h2>
            {children}
            <div className="rounded-lg">{footer}</div>
        </div>
    )
}
