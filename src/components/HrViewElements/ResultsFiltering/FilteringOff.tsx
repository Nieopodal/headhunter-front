type Props = {
    handleFilterOff: () => void;
};

export const FilteringOff = ({handleFilterOff}: Props) =>
    <div className="flex flex-row justify-between align-middle w-full">
        <h1
            className="text-3xl font-bold text-base-content">
            Filtrowanie
        </h1>
        <button
            onClick={handleFilterOff}
            className="z-10 w-1/8 max-sm:w-1/2 btn-sm h-7 bg-[#172A35] normal-case font-normal text-base rounded-none">
            Wyłącz filtrowanie
        </button>
    </div>