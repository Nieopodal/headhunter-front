import React, {
    Dispatch,
    ReactElement,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";
import {ModalPosition} from "../types/ModalPosition";

const ModalContext = React.createContext<{
    unSetModal: () => void;
    setModal: Dispatch<SetStateAction<ModalContent | null>>;
}>({
    unSetModal: () => {
    },
    setModal: () => null,
});

type ModalProps = {
    modal: ReactElement;
    unSetModal: () => void;
    position?: ModalPosition;
    timer?: number;
    fitHeight?: boolean;
};

const Modal = ({
                   modal,
                   timer,
                   position,
                   unSetModal,
                   fitHeight,
               }: ModalProps) => {
    useEffect(() => {
        if (timer) {
            const modalTimer = setTimeout(() => {
                unSetModal();
            }, 1000 * timer);
            return () => {
                clearTimeout(modalTimer);
            };
        }
    }, [timer, unSetModal]);

    return <div
        onClick={unSetModal}
        className={`flex z-20 top-0 left-0 w-full ${
            fitHeight ? `h-fit absolute` : `h-full fixed`
        } overflow-y-auto bg-neutral-900/30 items-${
            position ?? "center"
        } justify-center`}
    >
        <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-xl flex flex-col p-5 bg-neutral-900 m-5"
        >
            {modal}
        </div>
    </div>
};

type ModalProviderProps = {
    children: ReactElement;
};

type ModalContent = {
    modal: JSX.Element;
    timer?: number;
    position?: ModalPosition;
    fitHeight?: boolean;
};

const ModalProvider = (props: ModalProviderProps) => {
    const [modal, setModal] = useState<ModalContent | null>(null);
    const unSetModal = useCallback(() => {
        setModal(null);
    }, [setModal]);

    return <ModalContext.Provider value={{unSetModal, setModal}} {...props}>
        {props.children}
        {modal && (
            <Modal
                modal={modal.modal}
                timer={modal.timer}
                position={modal.position}
                unSetModal={unSetModal}
                fitHeight={modal.fitHeight}
            />
        )}
    </ModalContext.Provider>
};

export {ModalProvider, ModalContext};
