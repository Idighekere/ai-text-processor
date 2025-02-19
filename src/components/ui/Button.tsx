import { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
    variant?: "primary" | "secondary" | 'outline' | 'danger'
    className?: string;
    type?: "submit" | 'button' | 'reset'
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined | (() => void);
    disabled?: boolean
}
const Button = ({ children, variant = "primary", className, type = "button", onClick, disabled }: ButtonProps) => {

    let buttonStyles = ''
    switch (variant) {
        case 'primary':
            buttonStyles = ' bg-primary disabled:bg-primary/90 text-black'
            break;
        case 'outline':
            buttonStyles = 'border-primary border text-primary-green'
            break;
        case 'danger':
            buttonStyles = 'bg-red-600  text-white'
            break;
        default:
            break;
    }


    return (
        <button className={`${buttonStyles} ${className} px-4 py-1 rounded-md cursor-pointer disabled:cursor-not-allowed`} type={type} onClick={onClick} disabled={disabled} >{children}</button>
    )
}

export default Button
