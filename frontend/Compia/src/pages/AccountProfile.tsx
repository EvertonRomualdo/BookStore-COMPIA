import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { AccountSidebar } from "../components/AccountSidebar/AccountSidebar";
import PersonalDataForm from "../components/PersonalDataForm/PersonalDataForm";

export default function AccountProfile() {
    return (
        <div className="bg-[#F9FAFB] min-h-screen flex flex-col font-sans">
            <Header />

            <main className="flex-1 w-full max-w-6xl mx-auto py-12 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">


                    <AccountSidebar />


                    <section className="col-span-1 lg:col-span-3 flex flex-col gap-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                            Dados Pessoais
                        </h1>

                        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 md:p-10 transform transition-all duration-300 hover:shadow-md hover:border-purple-50">
                            <PersonalDataForm />
                        </div>
                    </section>

                </div>
            </main>

            <Footer />
        </div>
    );
}