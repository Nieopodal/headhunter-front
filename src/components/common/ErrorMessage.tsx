import React from "react"

type Props = {
    error: string
}

export const ErrorMessage = ({error}: Props) => {

    return (<>
            <h1 className="text-4xl text-center font-bold p-10">Ups, coś poszło nie tak :(</h1>
            <p className={"p-5 text-center text-error"}>{error}</p>
        </>
    )

}