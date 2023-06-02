import { useModal } from "../../../hooks/useModal";

export const FilteringModalControls = () => {
  const { unSetModal } = useModal();

  return <div className="flex flex-row w-full items-center justify-end gap-3">
      <span
        onClick={unSetModal}
        className="flex items-center align-middle px-5 z-10 w-1/8 h-9 normal-case font-normal text-base rounded-none cursor-pointer hover:bg-base-100"
      >
        Anuluj
      </span>

      <button className="z-10 w-1/8 btn-sm h-9 btn-primary normal-case font-normal text-base rounded-none">
        Pokaż wyniki
      </button>
    </div>
};
