import InformationCard from "./InformationCard";
import type { IconCardProps } from "./types";

function InformationCardIcon({
    icon,
    title,
    description,
    className
}:IconCardProps){

    return(

        <InformationCard
            title={title}
            description={description}
            className={className}
        >

            <div className="
                w-18
                h-18
                rounded-full
                bg-white
                shadow
                flex
                items-center
                justify-center
            ">
                {icon}
            </div>

        </InformationCard>

    )

}

export default InformationCardIcon;