import { HTMLInputTypeAttribute } from 'react'

export interface LabeledInputProps {
    id: string
    label: string
    value: string
    placeholder?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    type: HTMLInputTypeAttribute
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
}: LabeledInputProps) {
    return (
        <div className="col-auto">
            <label
                htmlFor={id}
                className="block text-gray-700 text-lg font-bold mb-2"
            >
                {label}
            </label>
            <input
                id={id}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-md focus:border-indigo-500"
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}
