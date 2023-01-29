import React from 'react';

type RadioButtonProps = {
    children: string;
    id: string;
    changed: any;
    value: string;
    isSelected: boolean;
}

export default function RadioButton({ id, changed, value, isSelected, children}: RadioButtonProps) {
    return (
        <div className='RadioButton'>
            <input id={id} onChange={changed} value={value} type="radio" checked={isSelected}/>
            <label htmlFor={id}>{children}</label>
        </div>
    );
}