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
                bg-(-paper)
                border-none
                p-2
                flex
                flex-col
                items-center
                gap-5
                w-50
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