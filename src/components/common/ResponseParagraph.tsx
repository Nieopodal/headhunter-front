interface Props {
    isSuccess?: boolean;
    text: string;
}

export const ResponseParagraph = ({isSuccess, text}: Props) => (
    <p className={isSuccess ? 'text-green-500' : 'text-red-500'}>{text}</p>
);