import {ReactNode} from "react";

interface Props {
    children: ReactNode;
    customClasses?: string;
    color?: string;
}

export const BodyOfSection = ({children, customClasses, color}: Props) => (
    <div className={customClasses ?? "text-lg p-4 flex"} style={color ? {color: color} : {}}>
        {children}
    </div>
);