interface Props {
    isSuccess?: boolean;
    text: string;
}

export const ResponseParagraph = ({isSuccess, text}: Props) => (
    <div className={isSuccess ? 'text-green-500' : 'text-red-500'}>{text}</div>
);