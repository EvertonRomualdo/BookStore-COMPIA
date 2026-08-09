import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DefaultInput } from "../DefaultInput/DefaultInput";
import { DefaultButton } from "../DefaultButton/DefaultButton";
import { useAuth } from "../../contexts/AuthContext";
import {useRef, useState} from "react";
import {cloudinaryService} from "../../service/cloudinaryService.ts";
import {UploadCloud} from "lucide-react";

const personalDataSchema = z.object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
    email: z.string().email("Formato de e-mail inválido."),
    address: z.string().optional(),
});

type PersonalData = z.infer<typeof personalDataSchema>;

export default function PersonalDataForm() {
    const { user, updateUser } = useAuth();
    const [successMsg, setSuccessMsg] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<PersonalData>({
        resolver: zodResolver(personalDataSchema),
        values: { name: user?.name || "", email: user?.email || "", address: user?.address || "" },
    });

    const onSubmit = async (data: PersonalData) => {
        setSuccessMsg("");
        try {
            await updateUser(data);
            setSuccessMsg("Dados atualizados com sucesso!");
        } catch (error: any) {
            setError('root', { type: 'manual', message: error.message });
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setSuccessMsg("");

        try {
            const avatarUrl = await cloudinaryService.uploadImage(file);

            await updateUser({
                name: user?.name || "",
                email: user?.email || "",
                avatar: avatarUrl
            });

            setSuccessMsg("Foto de perfil atualizada!");
        } catch (error: any) {
            setError('root', { type: 'manual', message: error.message });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">

            {errors.root?.message && (
                <div className="p-3 bg-red-50 text-red-600 text-sm font-semibold rounded-md border border-red-200">
                    {errors.root.message}
                </div>
            )}

            {successMsg && (
                <div className="p-3 bg-green-50 text-green-700 text-sm font-semibold rounded-md border border-green-200 animate-in fade-in">
                    {successMsg}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                <DefaultInput id="name" labelText="Nome completo" type="text" placeholder="Digite seu nome completo" error={errors.name?.message} {...register("name")} />
                <DefaultInput id="email" labelText="E-mail" type="email" placeholder="Digite seu e-mail" error={errors.email?.message} {...register("email")} />
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="w-full md:w-1/2">
                    <DefaultInput id="password" labelText="Senha" type="password" placeholder="********" disabled className="bg-[#F8FAFC] text-slate-400 cursor-not-allowed border-gray-200 px-4 py-3 rounded-md w-full" />
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-start pb-1">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />

                    <button
                        type="button"
                        disabled={isUploading}
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 font-semibold transition-colors disabled:opacity-50"
                    >
                        <UploadCloud size={20} />
                        {isUploading ? "Enviando..." : "Alterar Foto"}
                    </button>
                </div>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-2">
                <DefaultButton type="submit" disabled={isSubmitting} className="px-8 py-3 rounded-xl bg-[#5A46F3] hover:bg-purple-700 text-white font-semibold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer w-full md:w-auto">
                    {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                </DefaultButton>
            </div>
        </form>
    );


}