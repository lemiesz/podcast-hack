import { HTMLInputTypeAttribute } from 'react'

export interface LabeledInputProps {
    id: string
    label: string
    value: string
    placeholder?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    type: HTMLInputTypeAttribute
    error?: string
}

/**
 * Simple input with label. Can be used for text, password, email, etc.
 */
export function LabeledInput({
    id,
    label,
    onChange,
    value,
    placeholder,
    type,
    error,
}: LabeledInputProps) {
    return (
        <div className="space-y-2">
            <label
                htmlFor={id}
                className="block text-gray-700 text-lg font-bold mb-2"
            >
                {label}
            </label>
            <input
                id={id}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-md 
                            ${!error && 'focus:border-indigo-500'}
                            ${error && 'border-red-300 focus:border-red-500'}`}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}
