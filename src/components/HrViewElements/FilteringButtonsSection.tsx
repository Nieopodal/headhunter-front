import React, {PropsWithChildren, ReactElement} from "react";

type Props = {
    errorMsg: string | undefined,
    title: string,
    children: ReactElement
}

export const FilteringButtonsSection = ({children, title, errorMsg}: PropsWithChildren<Props>) => {
    return (<>
        <span>{title} <span className="text-xs text-primary ml-6">{errorMsg ?? errorMsg}</span>
        </span>
        <div className="flex max-sm:flex-col max-sm:items-start flex-row gap-3"> {children} </div>
    </>)
}