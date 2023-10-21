import { forwardRef, ComponentProps, ReactNode, useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { tv } from 'tailwind-variants'

interface TextInputRootProps {
    children: ReactNode;
    className?: string;
}

function TextInputRoot({ children, className }: TextInputRootProps) {
    const TextInputClass = tv({
        base: "flex gap-2 w-full "
    })

    return (
        <div className={TextInputClass({ className })}>
            {children}
        </div>
    )
}


type InputProps = ComponentProps<'input'> & {
    icon?: React.ReactNode;
};

type textInputBaseProps = ComponentProps<'input'>

const TextInputBase = forwardRef<HTMLInputElement, textInputBaseProps>(
    ({ ...inputProps }, ref) => {
        return (
            <input
                {...inputProps}
                ref={ref}
                className="flex-1 text-black-800 text-sm bg-gray-100  border-gray-300 placeholder:text-gray-800 "
            />

        );
    }
);

const TextInputInput = forwardRef<HTMLInputElement, InputProps>(
    ({ icon: Icon, ...inputProps }, ref) => {
        return (
            <div className=" flex-1 px-6 rounded-xl bg-gray-100 border-2 h-12 items-center  focus-within:border-purple-700 flex flex-row ">
                {
                    Icon && (
                        <div className="mr-2">
                            {Icon}
                        </div>
                    )
                }
                <TextInputBase {...inputProps} ref={ref} />

            </div>
        );
    }
);

const TextInputPassword = forwardRef<HTMLInputElement, textInputBaseProps>(
    ({ ...inputProps }, ref) => {
        const [passwordIsVisible, setPasswordIsVisible] = useState(false)

        function handleChangePasswordVisibility() {
            setPasswordIsVisible(!passwordIsVisible)
        }

        return (
            <div className="flex-1  px-6 rounded-xl bg-gray-100 border-2 h-12 items-center  focus-within:border-purple-700 flex flex-row ">
                <TextInputBase
                    {...inputProps}
                    type={passwordIsVisible ? 'text' : 'password'}
                    ref={ref}
                />
                <button
                    type="button"
                    onClick={handleChangePasswordVisibility}
                >
                    {
                        passwordIsVisible ? (
                            <Eye size={16} />
                        ) : (
                            <EyeOff size={16} />
                        )
                    }
                </button>
            </div>
        );
    }
);

interface TextInputErrorProps {
    children: ReactNode;
}

function TextInputError({ children }: TextInputErrorProps) {
    return (
        <div className="text-red-500 text-sm">
            {children}
        </div>
    )
}

export const TextInput = {
    Input: TextInputInput,
    Root: TextInputRoot,
    Error: TextInputError,
    Password: TextInputPassword
}

