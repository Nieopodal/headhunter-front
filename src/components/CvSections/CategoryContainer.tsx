import {ReactNode} from "react";

interface Props {
    title: string;
    children: ReactNode;
    justifyCenter?: boolean;
    error?: boolean;
}

export const CategoryContainer = ({title, children, justifyCenter, error}: Props) => (
<div className="mr-4 sm:mr-2 w-[190px] flex flex-col justify-between mb-8 xl:mb-0">
    <div className="text-sm mb-4 sm:mb-1" style={{color: error ? "#de2735" : "#838484" }}>
        {title}
    </div>
    <div className={`flex items-center ${justifyCenter ? 'justify-center' : ''}`}>
        {children}
    </div>
</div>
);