import type {ReactNode} from "react";

export interface OrderCardProps {
    orderNumber: string;
    title: string;
    date: string;
    icon: ReactNode;
    iconBgColor: string;
    iconTextColor: string;
    statusText: string;
    statusBgColor: string;
    statusTextColor: string;
    price?: string;
    actionButton?: {
        label: string;
        onClick: () => void;
    };
}

export function OrderCard({
                              orderNumber, title, date, icon, iconBgColor, iconTextColor,
                              statusText, statusBgColor, statusTextColor, price, actionButton
                          }: OrderCardProps) {
    return (
        <div
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-purple-100 cursor-default">

            <div className="flex items-center gap-6">
                <div
                    className={`w-16 h-16 ${iconBgColor} ${iconTextColor} rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 hover:rotate-3`}>
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-gray-400 tracking-wider mb-1 uppercase">
                        Pedido #{orderNumber}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                        {title}
                    </h3>
                    <span className="text-sm text-gray-400 mt-1">
                        Comprado em {date}
                    </span>
                </div>
            </div>

            <div
                className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 w-full md:w-auto mt-4 md:mt-0">
                <span
                    className={`px-3 py-1 ${statusBgColor} ${statusTextColor} text-[10px] font-bold rounded-full uppercase tracking-wider`}>
                    {statusText}
                </span>

                {price && (
                    <span className="text-[22px] font-bold text-slate-900 mt-1">
                        {price}
                    </span>
                )}

                {actionButton && (
                    <button
                        onClick={actionButton.onClick}
                        className="px-6 py-2.5 mt-1 bg-[#1E1B4B] hover:bg-[#3f3899] text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full md:w-auto"
                    >
                        {actionButton.label}
                    </button>
                )}
            </div>
        </div>
    );
}