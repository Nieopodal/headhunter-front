import React from "react"

type Props = {
    type?: "error" | "success",
    body: string,
    customTitle?: string
}

export const Message = ({type, body, customTitle}: Props) => {

    return <>
        <h1 className="text-4xl text-center font-bold p-5">
            {(!customTitle && type === "error") ? "Ups, coś poszło nie tak :(" : customTitle}
            {(!customTitle && type === "success") ? "Sukces!" : customTitle}
            {(!customTitle && !type) && "Hej!"}
        </h1>
        <p className={`p-5 text-center text-${type ?? 'base-content'}`}>{body}</p>
    </>

}