import React from 'react'

interface ISelectComponentProps {
    list: any
}


export default function SelectComponent(props: ISelectComponentProps) {
    const list = props.list ?? [];
    return (
        <select>
            {list.map((opt) => <option key={opt.label} value={opt.value} label={opt.label}>{opt.label}</option>)}
        </select>
    )
}
