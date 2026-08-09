import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { AccountSidebar } from "../components/AccountSidebar/AccountSidebar";
import { OrderCard } from "../components/OrderCard/OrderCard";
import { Book, Zap, PackageOpen } from "lucide-react";
import { getItem, STORAGE_KEYS } from "../service/storage";

function AccountPage() {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const savedOrders = getItem<any[]>(STORAGE_KEYS.ORDERS);
        if (savedOrders) {
            setOrders(savedOrders);
        }
    }, []);

    const downloadEbook = () => {
        const element = document.createElement("a");
        const file = new Blob(["Lorem ipsum dolor sit amet."], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "ebook-compia.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="bg-[#F9FAFB] min-h-screen flex flex-col font-sans">
            <Header />

            <main className="flex-1 w-full max-w-6xl mx-auto py-12 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">

                    <AccountSidebar />

                    <section className="col-span-1 lg:col-span-3 flex flex-col gap-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                            Histórico de Pedidos
                        </h1>

                        <div className="flex flex-col gap-5">
                            {orders.length === 0 ? (
                                <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                    <PackageOpen size={48} className="text-gray-300 mb-4" />
                                    <h2 className="text-xl font-bold text-gray-700 mb-1">Nenhum pedido encontrado</h2>
                                    <p className="text-gray-500">Você ainda não realizou nenhuma compra conosco.</p>
                                </div>
                            ) : (
                                orders.map((order, index) => (
                                    <OrderCard 
                                        key={index}
                                        orderNumber={order.id}
                                        title={order.title}
                                        date={order.date}
                                        icon={order.isDigitalOnly ? <Zap size={28} fill="currentColor" /> : <Book size={28} fill="currentColor" />}
                                        iconBgColor={order.isDigitalOnly ? "bg-orange-50" : "bg-blue-50"}
                                        iconTextColor={order.isDigitalOnly ? "text-orange-400" : "text-blue-400"}
                                        statusText={order.isDigitalOnly ? "Disponível" : "Preparando Envio"}
                                        statusBgColor={order.isDigitalOnly ? "bg-blue-100" : "bg-emerald-100"}
                                        statusTextColor={order.isDigitalOnly ? "text-blue-700" : "text-emerald-700"}
                                        price={`R$ ${order.total.toFixed(2).replace('.', ',')}`}
                                        actionButton={order.isDigitalOnly ? {
                                            label: "Download",
                                            onClick: downloadEbook
                                        } : undefined}
                                    />
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default AccountPage;