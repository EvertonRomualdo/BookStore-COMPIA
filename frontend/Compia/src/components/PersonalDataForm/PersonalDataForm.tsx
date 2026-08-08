import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {DefaultInput} from "../DefaultInput/DefaultInput";
import {DefaultButton} from "../DefaultButton/DefaultButton";

const personalDataSchema = z.object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
    email: z.string().email("Formato de e-mail inválido."),
});

type PersonalData = z.infer<typeof personalDataSchema>;

export default function PersonalDataForm() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<PersonalData>({
        resolver: zodResolver(personalDataSchema),
        defaultValues: {
            name: "Everton Daniel de Lima Romualdo",
            email: "everton.daniel@email.com",
        },
    });

    const onSubmit = (data: PersonalData) => {
        console.log("Dados atualizados:", data);
        // TODO: Enviar os dados para o backend
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                <DefaultInput
                    id="name"
                    labelText="Nome completo"
                    type="text"
                    placeholder="Digite seu nome completo"
                    error={errors.name?.message}
                    {...register("name")}
                />

                <DefaultInput
                    id="email"
                    labelText="E-mail"
                    type="email"
                    placeholder="Digite seu e-mail"
                    error={errors.email?.message}
                    {...register("email")}
                />
            </div>


            <div className="w-full md:w-1/2 md:pr-3">
                <DefaultInput
                    id="password"
                    labelText="Senha"
                    type="password"
                    placeholder="********"
                    disabled
                    className="bg-[#F8FAFC] text-slate-400 cursor-not-allowed border-gray-200 px-4 py-3 rounded-md w-full"
                />
            </div>


            <div className="pt-6 border-t border-gray-100 mt-2">
                <DefaultButton
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-[#5A46F3] hover:bg-purple-700 text-white font-semibold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer w-full md:w-auto"
                >
                    Salvar Alterações
                </DefaultButton>
            </div>
        </form>
    );
}