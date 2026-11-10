import { Card } from "../components/ui/Card";

const CardTestHarness = ({
    as = "div",
    className = "",
    title = "Test card",
    description = "This child content helps validate the parent component's styles, structure, and semantics.",
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
            description: "HTML element rendered by the parent component",
        },
        className: {
            control: "text",
            description: "Extra classes to test visual variants",
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
        description: "Change the controls to validate styles, the semantic wrapper, and child composition.",
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
        title: "Parent as button",
        description: "Tests Card when used as an interactive element.",
    },
    render: (args) => (
        <div className="min-h-[50vh] w-full bg-background-light p-6 dark:bg-background-dark">
            <CardTestHarness {...args} />
        </div>
    ),
};
