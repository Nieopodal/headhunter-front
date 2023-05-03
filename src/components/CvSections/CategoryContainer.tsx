import {ReactNode} from "react";

interface Props {
    title: string;
    children: ReactNode;
}

export const CategoryContainer = ({title, children}: Props) => (
<div className="mr-2 w-[190px] flex flex-col justify-between">
    <div className="text-sm" style={{color: "#838484"}}>
        {title}
    </div>
    <div className="flex items-center">
        {children}
    </div>
</div>
);