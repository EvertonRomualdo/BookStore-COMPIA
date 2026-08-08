import type React from "react";

type DefaultInputProps = {
    id: string;
    labelText: string;
    placeholder: string;
    error?: string;
} & React.ComponentProps<'input'>;

export function DefaultInput({ id, type, labelText, placeholder, error, ...rest }: DefaultInputProps) {
    return (
        <div className='flex flex-col p-2 gap-2 w-full'>
            <label className='text-black font-medium' htmlFor={id}>
                {labelText}
            </label>
            <input 
                className={`p-3 rounded-md outline-purple-500 border ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
                id={id} 
                type={type} 
                placeholder={placeholder}
                {...rest} 
            />
            {error && (
                <span className="text-red-500 text-sm">{error}</span>
            )}
        </div>
    );
}