import React from "react";
import {ModalContext} from "../contexts/modal.context";

export const useModal = () => {
    const context = React.useContext(ModalContext)
    if (context === undefined) {
        throw new Error('useModal must be used within a UserProvider');
    }

    return context;
};