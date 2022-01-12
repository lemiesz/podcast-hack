import React, { HTMLInputTypeAttribute } from 'react'
import './styles.css'
export interface LabeledInputBaseProps {
    id: string
    label: string
    value: string
    placeholder?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    type: HTMLInputTypeAttribute
    error?: string
}

function LabeledInputBase({
    id,
    label,
    onChange,
    value,
    placeholder,
    type,
    error,
    formType = 'input',
}: LabeledInputBaseProps & { formType: 'textarea' | 'input' }) {
    return (
        <div className="space-y-1">
            <label htmlFor={id} className="text-label">
                {label}
            </label>
            {React.createElement(formType, {
                id: id,
                className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-md 
                    ${!error && 'focus:border-indigo-500'}
                    ${error && 'border-red-300 focus:border-red-500'}`,
                type: type,
                placeholder: placeholder,
                value: value,
                onChange: onChange,
            })}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}

/**
 * Simple input with label. Can be used for text, password, email, etc.
 */
type LabeledInputProps = LabeledInputBaseProps
export function LabeledInput(props: LabeledInputProps) {
    return LabeledInputBase({ ...props, formType: 'input' })
}

/**
 * Simple textarea with label.
 */
type LabelTextAreaProps = LabeledInputBaseProps
export function LabeledTextArea(props: LabelTextAreaProps) {
    return LabeledInputBase({ ...props, formType: 'textarea' })
}
