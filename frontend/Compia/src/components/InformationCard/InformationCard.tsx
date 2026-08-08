import type { ReactNode } from "react";
import type { BaseCardProps } from "./types";

interface Props extends BaseCardProps{
    children?: ReactNode;
}

function InformationCard({
    title,
    description,
    className = "",
    children,
}: Props){


    return(
        <div
            className={`
                bg- white
                rounded-3xl
                border
                border-gray-200
                p-8
                flex
                flex-col
                items-center
                gap-5
                transition-all
                duration-300
                hover:bg-[#5A46F3]
                hover:text-white
                cursor-pointer
                ${className}
            `}
        >

            {children}

            <div className="text-center">

                <h3 className="font-bold text-xl">
                    {title}
                </h3>

                <p className="mt-2 text-gray-500">
                    {description}
                </p>

            </div>

        </div>
    )
}

export default InformationCard;