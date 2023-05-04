import React, {ReactNode} from "react";


interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}

export const Modal = (props: ModalType) => {
    return (
        <div className="flex absolute z-20 top-0 left-0 w-full h-full bg-neutral-900/30 items-center justify-center">
            <div className="flex flex-col p-5 w-1/3 h-2/3 bg-neutral-900">
                {props.children}
            </div>
        </div>
    )
}