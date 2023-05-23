import {useEffect, useState} from "react";
import {AiFillStar} from "react-icons/ai";

interface Props {
    howMany: number;
}

export const StarRating = ({howMany}: Props) => {
    const [stars, setStars] = useState<string[]>([])

    useEffect(() => {
        const starsArray = [];
        for (let i = 1; i < 6; i++) {
            starsArray.push(i <= howMany ? `red` : `grey`);
        }
        setStars(starsArray);
    }, [howMany]);

    return <div className="flex mx-1">
        {
            stars.map((el, i) => <AiFillStar key={i} color={el}/>)
        }
    </div>
};