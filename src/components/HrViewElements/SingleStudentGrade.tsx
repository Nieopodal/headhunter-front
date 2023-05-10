import React from "react";

type Props = {
    title: string;
    grade: number;
}

export const SingleStudentGrade = (props: Props) => {
    return (<div
        className="flex flex-col place-content-between bg-base-100 text-neutral-400 p-3 gap-3">
        <span className="text-xs leading-tight">{props.title}</span>
        <div><span
            className="leading-tight text-sm text-base-content font-bold">{props.grade}</span>
            <span
                className="leading-tight text-sm text-neutral-500 font-normal"> /5</span>
        </div>
    </div>)
}