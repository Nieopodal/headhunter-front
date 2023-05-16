import {CategoryContainer} from "./CategoryContainer";

interface Props {
    title: string;
    body: string;
}

export const ExpectationCategory = ({title, body}: Props) => (
    <CategoryContainer title={title}>
        <span className="font-bold text-sm">{body}</span>
    </CategoryContainer>
);