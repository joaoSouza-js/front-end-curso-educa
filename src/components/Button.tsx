import { ComponentProps, forwardRef } from "react";
import { VariantProps, tv } from "tailwind-variants";

const ButtonClass = tv({
  base:" h-12 justify-center items-center text-sm font-bold rounded-md  font-semibold   disabled:cursor-not-allowed  hover:shadow-lg transition duration-300 ease-in-out",
  variants: {
    variant: {
      default: "bg-purple-700 hover:bg-purple-600 bg-purple-700 text-white disabled:bg-purple-600 hover:bg-purple-600",
      danger: "bg-red-500 font-semibold py-2 px-4 text-white disabled:bg-red-300 hover:bg-red-600",
      withoutBackground: "bg-transparent h-auto  py-2 px-4  hover:border-zinc-900 hover:text-zinc-900 font-semibold border-2 text-zinc-800 border-zinc-800",
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

type ButtonVariants = VariantProps<typeof ButtonClass>

type  ButtonProps = ComponentProps<'button'> & ButtonVariants 

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children,className,variant='default', ...buttonProps },ref) => {
  return (
  <button
    {...buttonProps}
    ref={ref}
    
    className={ButtonClass({className,variant})}

  >
    {children}
  </button>
  );
})

