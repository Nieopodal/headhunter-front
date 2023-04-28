import React, {useState} from "react";
import {HiOutlineCheckCircle} from "react-icons/hi";

type Props = {
    userName: string
}

export const TempModal = (props: Props) => {
    const [tempModal, setTempModal] = useState(true);
    return (
        <>
            <input type="checkbox" id="my-modal-4" onClick={() => setTempModal(false)}
                   className="modal-toggle"/>
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box modal-bottom relative bg-base-300 shadow-amber-600" htmlFor="">
                    <div className="badge badge-lg badge-success rounded gap-2 flex items-center">
                        <HiOutlineCheckCircle/>
                        Logowanie udane!
                    </div>
                    <p className="py-4">Dobrze Cię widzieć, {props.userName}</p>
                </label>
            </label>
        </>
    )
}