import React, {PropsWithChildren} from "react";

type Props = {
    errorMsg: string | undefined;
    title: string;

}

export const FilteringButtonsSection = ({children, title, errorMsg}: PropsWithChildren<Props>) => (
    <div className="flex flex-col items-start gap-2 mt-5">
        <span>
            {title}
            <span className="text-xs text-primary ml-6">{errorMsg ?? errorMsg}</span>
        </span>
        <div className="flex  flex-row flex-wrap max-sm:items-start flex-row gap-3"> {children} </div>
    </div>
);