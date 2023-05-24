import { StarRating } from "../common/StarRating";
import { CategoryContainer } from "./CategoryContainer";

interface Props {
  title: string;
  amount: number;
}

export const StarsSection = ({ amount, title }: Props) => (
  <CategoryContainer title={title}>
    <div className="hidden sm:flex">
      <span className="font-bold">{amount}&nbsp;</span> /5 &nbsp;
    </div>
    <StarRating howMany={amount} />
  </CategoryContainer>
);
