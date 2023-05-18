import {ResponseParagraph} from "../common/ResponseParagraph";

interface Props {
    title: string;
    errorMsg?: string;
}

export const TitleOfSection = ({title, errorMsg}: Props) => (
    <div className="h-[60px] text-lg p-4 font-bold w-full" style={{background: "#292A2B"}}>
        <span className="flex">{title}&nbsp; {errorMsg && <ResponseParagraph text={errorMsg}/>}</span>
    </div>
);