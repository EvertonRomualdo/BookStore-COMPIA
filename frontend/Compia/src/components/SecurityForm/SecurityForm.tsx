import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DefaultInput } from "../DefaultInput/DefaultInput";
import { DefaultButton } from "../DefaultButton/DefaultButton";
import { authService } from "../../service/authService.ts";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const securitySchema = z.object({
    currentPassword: z.string().min(1, "A senha atual é obrigatória."),
    newPassword: z.string().min(6, "A nova senha deve ter no mínimo 6 caracteres.")
});

type SecurityData = z.infer<typeof securitySchema>;

export default function SecurityForm() {
    const { user } = useAuth();
    const [successMsg, setSuccessMsg] = useState("");

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SecurityData>({
        resolver: zodResolver(securitySchema),
    });

    const onSubmit = async (data: SecurityData) => {
        if (!user) return;
        setSuccessMsg("");

        try {
            await authService.changePassword(user.id, data.currentPassword, data.newPassword);
            reset();
            setSuccessMsg("Senha atualizada com segurança!");
        } catch (error: any) {
            setError('root', { type: 'manual', message: error.message });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-2xl mx-auto">

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

            <div className="flex flex-col gap-5">
                <DefaultInput id="currentPassword" labelText="SENHA ATUAL" type="password" placeholder="Digite sua senha atual" error={errors.currentPassword?.message} {...register("currentPassword")} />
                <DefaultInput id="newPassword" labelText="NOVA SENHA" type="password" placeholder="Digite sua nova senha" error={errors.newPassword?.message} {...register("newPassword")} />
            </div>

            <div className="pt-2">
                <DefaultButton type="submit" disabled={isSubmitting} className="w-full py-4 rounded-2xl bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center flex justify-center">
                    {isSubmitting ? "Autenticando..." : "Atualizar Senha"}
                </DefaultButton>
            </div>
        </form>
    );
}