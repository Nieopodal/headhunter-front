import React, {Dispatch, ReactElement, SetStateAction, useCallback, useEffect, useState} from 'react'
import {ReactComponent} from "*.svg";

const ModalContext = React.createContext<{
    unSetModal: () => void,
    setModal: any
}>({

    unSetModal: () => {
    },
    setModal: <></>
})

type ModalProps = {
    modal: ReactElement,
    unSetModal: () => void
}

const Modal = ({modal, unSetModal}: ModalProps) => {
    useEffect(() => {
        const bind = (e: KeyboardEvent) => {
            if (e.key !== ("Escape" || "Esc")) {
                return
            }

            if (document.activeElement && ['INPUT', 'SELECT'].includes(document.activeElement.tagName)) {
                return
            }

            unSetModal()
        }

        document.addEventListener('keyup', bind)
        return () => document.removeEventListener('keyup', bind)
    }, [modal, unSetModal])

    return (
        <dialog onClick={unSetModal} className="flex absolute z-20 top-0 left-0 w-full h-full bg-neutral-900/30 items-center justify-center">
            <div onClick={e => e.stopPropagation()} className="flex flex-col p-5 w-1/3 h-2/3 bg-neutral-900">
                {modal}
            </div>
        </dialog>
    )
}

type ModalProviderProps = {
    children: ReactElement
}
const ModalProvider = (props: ModalProviderProps) => {
    const [modal, setModal] = useState(null)
    const unSetModal = useCallback(() => {
        setModal(null)
    }, [setModal])

    return (
        <ModalContext.Provider value={{unSetModal, setModal}} {...props} >
            {props.children}
            {modal && <Modal modal={modal} unSetModal={unSetModal}/>}
        </ModalContext.Provider>
    )
}

const useModal = () => {
    const context = React.useContext(ModalContext)
    if (context === undefined) {
        throw new Error('useModal must be used within a UserProvider')
    }

    return context
}

export {ModalProvider, useModal}