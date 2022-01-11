import { useState } from 'react'
import './styles.css'
import { CheckCircleIcon } from '@heroicons/react/outline'

interface UploadFieldProps {
    onChange: (file: File) => void
    label?: string
    error?: string
}
export function UploadField({
    onChange,
    label = 'File Upload',
    error,
}: UploadFieldProps) {
    const [selectedFile, setSelectedFile] = useState<null | File>(null)

    return (
        <div className="space-y-2">
            <label className="text-label">{label}</label>
            <div className="flex w-full">
                {!selectedFile && (
                    <AttachFile
                        error={error}
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setSelectedFile(e.target.files[0])
                                onChange(e.target.files[0])
                            }
                        }}
                    />
                )}
                {selectedFile && (
                    <div className="flex flex-row bg-green-400 border-green-500 border-2 rounded-md p-4 w-full justify-between">
                        <p className="pt-1 text-mg tracking-wider text-white font-bold group-hover:text-gray-600">
                            {selectedFile.name}
                        </p>
                        <CheckCircleIcon className="text-white w-8 h-8" />
                    </div>
                )}
            </div>
        </div>
    )
}

function AttachFile({
    onChange,
    error,
}: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    error?: string
}) {
    return (
        <label
            className={`flex flex-col w-full h-32 border-4  border-dashed 
                         hover:shadow-md 
                         focus:border-blue-600 focus:shadow-md
                         ${error ? 'border-red-400' : 'border-blue-200'}
                         ${
                             error
                                 ? 'hover:border-red-500'
                                 : 'hover:bg-gray-100 hover:border-gray-300'
                         }`}
        >
            <div className="flex flex-col items-center justify-center pt-7">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                </svg>
                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    {error ? error : 'Attach a file'}
                </p>
            </div>
            <input
                type="file"
                className="opacity-0 w-full h-full"
                onChange={onChange}
            />
        </label>
    )
}
