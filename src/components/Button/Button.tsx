import React from 'react';
import './Button.css'

interface IProps {
    children: string;
}


const Button: React.FC<IProps> = ({ children, ...rest }) => {
    return (
        <button className="button" {...rest}>
            {children}
        </button>
    )
}

export default Button;