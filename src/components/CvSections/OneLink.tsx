import {IoMdAttach} from "react-icons/io";

interface Props {
    url: string;
}

export const OneLink = ({url}: Props) => (
        <span className="flex items-center"><IoMdAttach size={28}/>
            <a className="text-base" href={url}>{url}</a>
        </span>
);