import React from "react";

type Props = {
    title: string;
    description: string;
}

export const SingleStudentPreferenceItem = (props: Props) => (
    <div
        className="flex flex-col place-content-between bg-base-100 text-neutral-400 p-3 gap-3">
        <span className="text-xs leading-tight">{props.title}</span>
        <span
            className="leading-tight text-sm text-base-content font-bold">{props.description}</span>
    </div>
);