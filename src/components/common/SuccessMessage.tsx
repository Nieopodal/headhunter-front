import React from "react"

type Props = {
    message: string
}

export const SuccessMessage = ({message}: Props) => {

    return (<>
            <h1 className="text-4xl text-center font-bold p-10">Sukces!</h1>
            <p className={"p-5 text-center text-success"}>{message}</p>
        </>
    )

}