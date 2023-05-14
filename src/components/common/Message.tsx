import React from "react"

type Props = {
    type?: "error" | "success",
    body: string,
    customTitle?: string
}

export const Message = ({type, body, customTitle}: Props) => {

    function setTitle() {
        if (type === "error") {
            return "Ups, coś poszło nie tak :("
        }
        if (type === "success") {
            return "Sukces!"
        }
        if (!type) {
            return "Hej!"
        }
    }

    function setColor() {
        if (type === "error") {
            return "error"
        }
        if (type === "success") {
            return "success"
        }
        if (!type) {
            return "base"
        }
    }

    const color = setColor();
    const defaultTitle = setTitle();

    return <>
        <h1 className="text-4xl text-center font-bold p-5">
            {customTitle ?? defaultTitle}
        </h1>
        <p className={`p-5 text-center text-${color}`}>{body}</p>
    </>

}