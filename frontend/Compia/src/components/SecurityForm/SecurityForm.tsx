import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {DefaultInput} from "../DefaultInput/DefaultInput";
import {DefaultButton} from "../DefaultButton/DefaultButton";

const securitySchema = z.object({
    currentPassword: z.string().min(1, "A senha atual é obrigatória."),
    newPassword: z.string().min(6, "A nova senha deve ter no mínimo 6 caracteres.")
});

type SecurityData = z.infer<typeof securitySchema>;

export default function SecurityForm() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SecurityData>({
        resolver: zodResolver(securitySchema),
    });

    const onSubmit = (data: SecurityData) => {
        console.log("Pedido de alteração de senha submetido:", data);
        // TODO: Fazer o POST para a rota de alteração de senha no backend
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
            <div className="flex flex-col gap-5">
                <DefaultInput
                    id="currentPassword"
                    labelText="SENHA ATUAL"
                    type="password"
                    placeholder="Digite sua senha atual"
                    error={errors.currentPassword?.message}
                    {...register("currentPassword")}
                />

                <DefaultInput
                    id="newPassword"
                    labelText="NOVA SENHA"
                    type="password"
                    placeholder="Digite sua nova senha"
                    error={errors.newPassword?.message}
                    {...register("newPassword")}
                />
            </div>

            <div className="pt-2">
                <DefaultButton
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center flex justify-center"
                >
                    Atualizar Senha
                </DefaultButton>
            </div>
        </form>
    );
}