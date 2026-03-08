import { Button } from "../components/ui/Button";
import { Moon } from "lucide-react";

export default {
    title: "UI/Button",
    component: Button,
    parameters: {
        layout: "fullscreen",
        viewport: {
            defaultViewport: "responsive",
        },
    },
};

export const Default = () => {
    return (
        <div className="absolute flex flex-col size-full bg-background-light dark:bg-background-dark">
            <Button
                inside={<Moon className="size-7" />}
                insideStyle="p-2!"
                byside="Darkmode"
                onClick={() => alert("¡Hizo click!")}
            />

            <Button
                inside={
                    <span className="flex flex-wrap items-center justify-center font-semibold gap-2">
                        <Moon className="size-7" />
                        Activar el modo oscuro del sistema
                    </span>
                }
            />

            <Button style="primary" inside="Registrar" />
            <Button style="secundary" inside="Enviar" />
            <Button style="medium" inside="Seleccionar" />
            <Button style="complementary" inside="+ Agregar" />
            <Button style="danger" inside="Cancelar" />
            <Button style="warning" inside="Volver a inicio" />
        </div>
    )

}
