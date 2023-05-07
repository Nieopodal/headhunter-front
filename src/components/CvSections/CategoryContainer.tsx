import {ReactNode} from "react";

interface Props {
    title: string;
    children: ReactNode;
    justifyCenter?: boolean;
    error?: boolean;
}

export const CategoryContainer = ({title, children, justifyCenter, error}: Props) => (
<div className="mr-2 w-[190px] flex flex-col justify-between">
    <div className="text-sm mb-1" style={{color: error ? "#de2735" : "#838484" }}>
        {title}
    </div>
    <div className={`flex items-center ${justifyCenter ? 'justify-center' : ''}`}>
        {children}
    </div>
</div>
);