import React from "react";

export interface IconComponentProps {
    id: any,
    label: any,
    className: any
}


export default function IconComponent({id, className, label}: IconComponentProps) {
    return (
        <div data-menuid={id} className="disabled">
            <div><span className={className}></span></div>
            <div>{label}</div>
        </div>
    )
}