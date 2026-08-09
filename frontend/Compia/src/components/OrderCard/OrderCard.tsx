import { type ReactNode, useState } from "react";
import { Download, ChevronDown, ChevronUp } from "lucide-react";

export interface OrderCardItem {
    title: string;
    imageUrl?: string;
    isDigital?: boolean;
}

export interface OrderCardProps {
    orderNumber: string;
    title: string;
    date: string;
    icon?: ReactNode;
    imageUrl?: string;
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
    items?: OrderCardItem[];
    onDownloadItem?: (title: string) => void;
}

export function OrderCard({
                              orderNumber, title, date, icon, imageUrl, iconBgColor, iconTextColor,
                              statusText, statusBgColor, statusTextColor, price, actionButton,
                              items, onDownloadItem
                          }: OrderCardProps) {
    
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col transform transition-all duration-300 hover:shadow-md hover:border-purple-100 cursor-default">

            {/* Cabeçalho Principal do Pedido */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 ${imageUrl ? 'bg-gray-100 p-1' : iconBgColor} ${iconTextColor} rounded-2xl flex items-center justify-center shrink-0 overflow-hidden border border-gray-100`}>
                        {imageUrl ? (
                            <img src={imageUrl} alt={`Capa do pedido ${orderNumber}`} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                            icon
                        )}
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

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 w-full md:w-auto mt-4 md:mt-0">
                    <span className={`px-3 py-1 ${statusBgColor} ${statusTextColor} text-[10px] font-bold rounded-full uppercase tracking-wider`}>
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
                            className="px-6 py-2.5 mt-1 bg-[#1E1B4B] hover:bg-[#3f3899] text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-md active:translate-y-0 cursor-pointer w-full md:w-auto"
                        >
                            {actionButton.label}
                        </button>
                    )}
                </div>
            </div>

            {/* Botão de Expandir/Retrair (Só aparece se houver itens) */}
            {items && items.length > 0 && (
                <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="flex items-center justify-center gap-2 mt-5 pt-3 border-t border-gray-50 text-gray-500 hover:text-[#5A46F3] text-sm font-semibold transition-colors w-full"
                >
                    {isExpanded ? (
                        <><ChevronUp size={18} /> Ocultar itens do pedido</>
                    ) : (
                        <><ChevronDown size={18} /> Ver detalhes do pedido</>
                    )}
                </button>
            )}

            {/* Lista Expandida de Itens */}
            {isExpanded && items && items.length > 0 && (
                <div className="w-full mt-4 flex flex-col gap-3 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                                <div className="flex items-center gap-3 overflow-hidden mr-2">
                                    {item.imageUrl && (
                                        <img src={item.imageUrl} alt={item.title} className="w-10 h-14 object-cover rounded shadow-sm shrink-0" />
                                    )}
                                    <span className="font-semibold text-gray-800 text-sm truncate" title={item.title}>
                                        {item.title}
                                    </span>
                                </div>
                                
                                {/* Lógica Condicional: Botão de Download OU Status de Envio */}
                                {item.isDigital ? (
                                    <button
                                        onClick={() => onDownloadItem && onDownloadItem(item.title)}
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1E1B4B] hover:bg-[#3f3899] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm shrink-0"
                                    >
                                        <Download size={14} />
                                        <span className="hidden sm:inline">Baixar</span>
                                    </button>
                                ) : (
                                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-md uppercase tracking-wider shrink-0 text-center">
                                        Preparando Envio
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}