import React, {Dispatch, ReactElement, SetStateAction, useCallback, useState} from 'react'

const ModalContext = React.createContext<{ unSetModal: () => void, setModal: Dispatch<SetStateAction<any>>}>({
    unSetModal: () => {},
    setModal: () => null,
})

type ModalProps = {
    modal: ReactElement,
    unSetModal: () => void
}

const Modal = ({modal, unSetModal}: ModalProps) => {
    return (
        <div onClick={unSetModal} className="flex absolute z-20 top-0 left-0 w-full h-full bg-neutral-900/30 items-center justify-center ">
            <div onClick={e => e.stopPropagation()} className="flex flex-col p-5 bg-neutral-900">
                {modal}
            </div>
        </div>
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



export {ModalProvider, ModalContext}