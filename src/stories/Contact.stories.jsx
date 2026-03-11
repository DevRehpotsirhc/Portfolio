import { Contact } from "../components/layouts/Contact";

export default {
    title: "Layouts/Contact",
    component: Contact,
    parameters: {
        layout: "fullscreen",
        viewport: {
            defaultViewport: "responsive",
        },
    },
};

export const Default = () => {
    return (
        <div className="sticky min-h-dvh size-full bg-background-light dark:bg-background-dark">
            <div className="flex gap-2 w-full p-2">
            <Contact />
            </div>
        </div>
    )

}