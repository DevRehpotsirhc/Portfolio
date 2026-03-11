import { Welcome } from "../components/layouts/Welcome";

export default {
    title: "Layouts/Welcome",
    component: Welcome,
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
            <Welcome />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur asperiores ad a, sed suscipit, alias iure dolorem rerum odio eum incidunt doloremque non aliquid omnis nobis in harum, magnam facere.
            Explicabo odit quas hic! Dolorem vitae rem facilis quam doloremque. Nemo perferendis fugit harum ad earum quia qui pariatur similique. Eum perspiciatis culpa veniam voluptates asperiores eos accusamus illum incidunt.
        </div>
    )

}