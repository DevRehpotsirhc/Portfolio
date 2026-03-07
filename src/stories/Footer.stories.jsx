import { Footer } from "../components/layouts/Footer";

export default {
    title: "Layouts/Footer",
    component: Footer,
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
            <Footer />
        </div>
    )
}

export const Content = () => {
    return (
        <div className="sticky min-h-dvh size-full bg-background-light dark:bg-background-dark">
            <main className="text-black dark:text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam eum et voluptatum quos mollitia velit ipsam eligendi culpa, voluptatibus, ipsa deleniti nihil quod facilis necessitatibus tempora doloremque excepturi tenetur voluptatem!
            Aspernatur voluptatum excepturi voluptates ut, repellendus repellat ullam fugit voluptas, aut dicta debitis porro odit adipisci provident veniam sequi, beatae quidem facere sapiente minima temporibus dolores consequuntur? Expedita, soluta consequatur!
            Expedita, accusantium officia repudiandae similique tenetur odit obcaecati vitae mollitia ab, a omnis unde doloremque saepe! Expedita repellat labore enim similique, ad mollitia accusamus sunt corrupti ab minus quasi animi?
            Amet excepturi laudantium officia aliquid eum unde, vitae culpa ea maiores nobis fugiat enim nemo dicta a? Velit accusantium modi eos ad asperiores perferendis veritatis quae distinctio. Nostrum, asperiores at.
            Doloribus quia blanditiis eius in, voluptatibus ut velit possimus veritatis cum architecto assumenda excepturi magni molestiae ipsa, sit mollitia quae ex saepe hic aspernatur aliquam. Saepe minus earum exercitationem iusto.
            Voluptatum reprehenderit aliquam quod sunt, doloremque eveniet consequatur, consectetur suscipit reiciendis molestias iure. Officia iste quisquam illo vero assumenda quis, impedit velit nesciunt hic magni alias dolor optio exercitationem quaerat!
            Consequuntur totam molestiae saepe necessitatibus debitis aut, suscipit aperiam, mollitia voluptas alias, repellat repudiandae ex illum labore eius maiores. Blanditiis a dignissimos eos, ullam suscipit eveniet voluptatem corporis debitis minus!
            Voluptatum iste animi debitis aliquid maxime laborum sed eveniet culpa ipsa porro placeat libero, impedit fugiat eos cupiditate. Ullam totam quae beatae magni voluptatem aut numquam eaque perferendis dolorum dolores?
            Ipsum porro alias laboriosam fuga, dolor voluptas velit beatae autem distinctio quos soluta hic tempore, a quo temporibus inventore nemo possimus. Sint nulla rem minima voluptatem unde doloribus obcaecati dolorum.
            Dignissimos provident, recusandae odio, temporibus quaerat, voluptatem animi laudantium reprehenderit repellat ea itaque. Dolore numquam cumque accusantium iste? Assumenda iure pariatur autem impedit asperiores a corrupti distinctio ratione facere sed.</main>
            <Footer />
        </div>
    )
}