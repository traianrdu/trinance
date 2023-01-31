import React from 'react';

type RadioButtonProps = {
    children: string;
    id: string;
    changed: any;
    value: string;
    isSelected: boolean;
    isDisabled: boolean;
}

export default function RadioButton({ id, changed, value, isSelected, children, isDisabled}: RadioButtonProps) {
    return (
        <div className='RadioButton'>
            <input id={id} onChange={changed} value={value} type="radio" checked={isSelected} disabled={isDisabled}/>
            <label htmlFor={id}>{children}</label>
        </div>
    );
}