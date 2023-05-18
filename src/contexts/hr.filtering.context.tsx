import {createContext, Dispatch, PropsWithChildren, SetStateAction, useState} from 'react';
import {HrFilteringCriteria} from "../types/HrFilteringCriteria";

type FilterContext = {
    currentFilters: HrFilteringCriteria | null,
    setCurrentFilters: Dispatch<SetStateAction<HrFilteringCriteria | null>>
    isFiltering: boolean
    setIsFiltering: Dispatch<SetStateAction<boolean>>
}

export const HrFilteringContext = createContext<FilterContext>({
    currentFilters: null,
    setCurrentFilters: () => {
    },
    isFiltering: false,
    setIsFiltering: () => {
    }
});

export const HrFilteringProvider = (props: PropsWithChildren) => {
    const [isFiltering, setIsFiltering] = useState(false);
    const [currentFilters, setCurrentFilters] = useState<HrFilteringCriteria | null>(null);
    return <HrFilteringContext.Provider
        value={{currentFilters, setCurrentFilters, isFiltering, setIsFiltering}}>
        {props.children}
    </HrFilteringContext.Provider>
}