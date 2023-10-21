import { ComponentProps } from "react";
import { tv } from "tailwind-variants";

interface ButtonProps extends ComponentProps<'button'> {}

export function Button({ children,className, ...buttonProps }: ButtonProps) {
    const ButtonClass = tv({
        base:" h-12 justify-center items-center text-sm font-bold rounded-md bg-purple-700 text-white font-semibold disabled:bg-gray-300 disabled:bg-purple-600 disabled:cursor-not-allowed hover:bg-purple-600 hover:shadow-lg transition duration-300 ease-in-out",
      
    })

  return (
    <button
      {...buttonProps}
      className={ButtonClass({className})}

    >
      {children}
    </button>
  );
}