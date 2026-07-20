import { Card } from "../components/ui/Card";

const CardTestHarness = ({
    as = "div",
    className = "",
    title = "Card de prueba",
    description = "Este contenido hijo te sirve para validar estilos, estructura y semántica del componente padre.",
}) => {
    return (
        <Card as={as} className={className}>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
            <div className="mt-4 flex gap-2">
                <span className="rounded-md bg-slate-200 px-2 py-1 text-xs dark:bg-slate-800">Tag A</span>
                <span className="rounded-md bg-slate-200 px-2 py-1 text-xs dark:bg-slate-800">Tag B</span>
            </div>
        </Card>
    );
};

export default {
    title: "UI/Card",
    component: Card,
    parameters: {
        layout: "centered",
        viewport: {
            defaultViewport: "responsive",
        },
    },
    argTypes: {
        as: {
            control: "text",
            description: "Elemento HTML renderizado por el componente padre",
        },
        className: {
            control: "text",
            description: "Clases adicionales para probar variantes visuales",
        },
        title: {
            control: "text",
        },
        description: {
            control: "text",
        },
    },
};

export const Playground = {
    args: {
        as: "section",
        className: "max-w-md",
        title: "Prueba del componente padre Card",
        description: "Cambia los controles para validar estilos, wrapper semántico y composición de hijos.",
    },
    render: (args) => (
        <div className="min-h-[50vh] w-full bg-background-light p-6 dark:bg-background-dark">
            <CardTestHarness {...args} />
        </div>
    ),
};

export const ClickableParent = {
    args: {
        as: "button",
        className: "max-w-md text-left transition hover:scale-[1.01]",
        title: "Padre como botón",
        description: "Sirve para probar cuando Card se usa como elemento interactivo.",
    },
    render: (args) => (
        <div className="min-h-[50vh] w-full bg-background-light p-6 dark:bg-background-dark">
            <CardTestHarness {...args} />
        </div>
    ),
};
