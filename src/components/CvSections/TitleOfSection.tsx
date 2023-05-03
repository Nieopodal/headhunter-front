interface Props {
    title: string;
}

export const TitleOfSection = ({title}: Props) => (
    <div className="h-[60px] text-lg p-4 font-bold w-full" style={{background: "#292A2B"}}>
        {title}
    </div>
);