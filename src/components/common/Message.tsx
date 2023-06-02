import React from "react";

type Props = {
  type?: "error" | "success";
  body: string;
  customTitle?: string;
};

export const Message = ({ type, body, customTitle }: Props) => {
  function setTitle() {
    if (customTitle) {
      return customTitle;
    }
    if (type === "error") {
      return "Ups, coś poszło nie tak :(";
    }
    if (type === "success") {
      return "Sukces!";
    }
  }

  function setColor() {
    if (type === "error") {
      return `text-error`;
    }
    if (type === "success") {
      return `text-success`;
    }
    if (!type) {
      return `text-base`;
    }
  }

  const color = setColor();
  const title = setTitle();

  return <>
      <h1 className="text-4xl text-center font-bold p-5">{title}</h1>
      <p className={`p-5 text-center ${color}`}>{body}</p>
    </>
};
