import React, {FC} from 'react';

interface ButtonProps
extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

const Button: FC<ButtonProps> = ({children, ...props}) => {
    return (
        <button style={{backgroundColor: "inherit", fontSize: "inherit"}} {...props}>
            {children}
        </button>
    );
};

export default Button;