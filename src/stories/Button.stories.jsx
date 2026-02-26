import { Button } from "../components/ui/Button";
import { Moon } from "lucide-react";

export default {
    title: "Components/Button",
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
        <div className="absolute size-full bg-background-light pt-20 px-10 dark:bg-background-dark">
            <Button
                inside={<Moon className="size-7" />}
                insideStyle="p-2!"
                byside="Darkmode"
                onClick={() => alert("¡Hizo click!")}
            />

            <Button
                inside={
                    <span className="flex items-center font-semibold gap-2">
                        <Moon className="size-7" />
                        DarkMode
                    </span>
                }
                onClick={() => alert("¡Hizo click!")}
            />
        </div>
    )

}
