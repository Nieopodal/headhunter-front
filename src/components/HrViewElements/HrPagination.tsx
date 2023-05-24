import React from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

type Props = {
    currentPageNr: number;
    totalPagesNr: number;
    maxStudentsPerPage: number;
    nextPage: () => void;
    prevPage: () => void;
    setMaxPerPage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const HrPagination = ({
                                 currentPageNr,
                                 prevPage,
                                 setMaxPerPage,
                                 nextPage,
                                 totalPagesNr,
                                 maxStudentsPerPage
                             }: Props) => (

    <div className="flex flex-row gap-5 items-center">
        Ilość elementów
        <select onChange={(e) => setMaxPerPage(e)}
                className="select bg-white text-base-100 select-sm w-13">
            <option disabled selected style={{display: "none"}}>{maxStudentsPerPage}</option>
            {new Array(5)
                .fill(null)
                .map((array, i) => <option>{(i+1)*10}</option>)
            }
        </select>
        {currentPageNr} z {totalPagesNr}
        <div className="flex flex-row items-center gap-2">
            <button onClick={prevPage}
                    className={`flex flex-row items-center justify-center ${currentPageNr === 1 ? "bg-neutral-500" : "bg-neutral-300"} w-7 h-7`}
            >
                <IoIosArrowBack className="fill-base-100"/>
            </button>
            <button onClick={nextPage}
                    className={`flex flex-row items-center justify-center ${currentPageNr === totalPagesNr ? "bg-neutral-500" : "bg-neutral-300"} w-7 h-7`}
            >
                <IoIosArrowForward className="fill-base-100"/>
            </button>
        </div>
    </div>
);