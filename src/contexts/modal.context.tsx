import React, {Dispatch, ReactElement, SetStateAction, useCallback, useEffect, useState} from 'react'
import {ModalPosition} from "../types/ModalPosition";

const ModalContext = React.createContext<{ unSetModal: () => void, setModal: Dispatch<SetStateAction<ModalContent | null>> }>({
    unSetModal: () => {
    },
    setModal: () => null,
})

type ModalProps = {
    modal: ReactElement,
    unSetModal: () => void,
    position?: ModalPosition,
    timer?: number
}

const Modal = ({modal, timer, position, unSetModal}: ModalProps) => {
    console.log(position, timer);

    useEffect(() => {
        const modalTimer = setTimeout(() => {
            unSetModal();
        }, 1000 * timer!);
        return () => {
            clearTimeout(modalTimer)
        };
    }, [timer, unSetModal]);

    return (
        <div onClick={unSetModal}
             className={`flex absolute z-20 top-0 left-0 w-full h-full bg-neutral-900/30 items-${position ?? 'center'} justify-center`}>
            <div onClick={e => e.stopPropagation()} className="rounded-xl flex flex-col p-5 bg-neutral-900 mt-4">
                {modal}
            </div>
        </div>
    )
}

type ModalProviderProps = {
    children: ReactElement
}

type ModalContent = {
    modal: JSX.Element,
    timer?: number,
    position?: ModalPosition,
}

const ModalProvider = (props: ModalProviderProps) => {
    const [modal, setModal] = useState<ModalContent | null>(null)
    const unSetModal = useCallback(() => {
        setModal(null)
    }, [setModal])

    return <ModalContext.Provider value={{unSetModal, setModal}} {...props} >
        {props.children}
        {modal && <Modal modal={modal.modal} timer={modal.timer} position={modal.position} unSetModal={unSetModal}/>}
    </ModalContext.Provider>
}

export {ModalProvider, ModalContext}