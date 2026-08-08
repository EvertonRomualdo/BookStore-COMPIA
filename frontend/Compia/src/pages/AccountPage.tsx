import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { AccountSidebar } from "../components/AccountSidebar/AccountSidebar";
import { OrderCard } from "../components/OrderCard/OrderCard";
import { Book, Zap } from "lucide-react";

function AccountPage() {
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

                            <OrderCard
                                orderNumber="40291"
                                title="Arquitetura de Software Inteligente"
                                date="12/07/2026"
                                icon={<Book size={28} fill="currentColor" />}
                                iconBgColor="bg-blue-50"
                                iconTextColor="text-blue-400"
                                statusText="Entregue"
                                statusBgColor="bg-emerald-100"
                                statusTextColor="text-emerald-700"
                                price="R$ 120,00"
                            />


                            <OrderCard
                                orderNumber="39920"
                                title="Fundamentos de Deep Learning (E-book)"
                                date="05/06/2026"
                                icon={<Zap size={28} fill="currentColor" />}
                                iconBgColor="bg-orange-50"
                                iconTextColor="text-orange-400"
                                statusText="Disponível"
                                statusBgColor="bg-blue-100"
                                statusTextColor="text-blue-700"
                                actionButton={{
                                    label: "Download",
                                    onClick: () => console.log("Iniciando download...") // TODO: Lógica JS futura
                                }}
                            />
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default AccountPage;