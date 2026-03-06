import { Header } from "../components/ui/Header";
import { Footer } from "../components/ui/Footer";

export default {
    title: "Components/Header",
    component: Header,
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
            <Header />
        </div>
    )

}

export const Content = () => {
    return (
        <div className="sticky size-full min-h-dvh bg-background-light px-10 dark:bg-background-dark">
            <Header />
            <p className="text-black dark:text-slate-400 m-auto max-w-300">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis facere repellendus voluptatum beatae, delectus velit aut incidunt optio eos, illo iusto, tempora dolore obcaecati labore ullam exercitationem adipisci dolor et.
            Inventore magni doloribus quibusdam minima quae. Pariatur omnis officiis rem nostrum suscipit eos mollitia accusamus quibusdam illo temporibus est repudiandae alias, exercitationem architecto ut, molestiae incidunt velit maiores impedit repellendus?
            Commodi soluta accusamus, culpa quibusdam maxime quia expedita illo delectus error vero ullam itaque, odio ex, necessitatibus alias reprehenderit! Assumenda explicabo magnam tempora obcaecati reprehenderit consectetur saepe. Maiores, quos nesciunt!
            A error culpa magni similique ducimus. Nostrum natus facere ipsam sapiente porro vero iusto amet neque iste maxime sint fuga labore, ullam rerum quis optio odio in? Porro, dolore nesciunt.
            Nobis voluptatum incidunt cupiditate debitis illo non corporis unde architecto laboriosam quam mollitia voluptates, rerum, sequi asperiores fuga sapiente similique natus provident, dolorem vel velit! Dicta velit cumque doloremque saepe!
            Excepturi sit ipsum numquam molestias pariatur optio modi saepe, aliquid, blanditiis facere neque. Provident doloremque sint, aperiam voluptate enim deleniti explicabo assumenda? Ratione, ipsa modi! Non maiores velit dignissimos tenetur.
            Accusamus autem totam laborum nisi? Ipsum voluptatibus quidem dignissimos sit! Labore porro at sed vitae aut harum eius facere distinctio, consectetur deleniti voluptates sit laboriosam hic, commodi molestiae id veritatis!
            A quisquam tempora illo impedit inventore aut natus consequatur ducimus optio consequuntur, nam repudiandae, amet blanditiis, ut beatae repellat. Laudantium dolorum illo voluptatum iusto blanditiis. Quasi, maxime eveniet! Id, facilis.
            Praesentium a dolore adipisci! Itaque tempora quasi consectetur architecto eligendi. Velit impedit veniam pariatur quod eum, quos eius sint ullam repellat, asperiores doloremque laborum quaerat sit debitis voluptas dicta? Perspiciatis!
            Deleniti voluptatibus dignissimos ut at officia blanditiis placeat assumenda sapiente, dolorum numquam amet quod iste temporibus quis perspiciatis praesentium asperiores possimus, a commodi necessitatibus, totam delectus. Distinctio quidem ullam labore?
            Dolore at laudantium aut, sint quia debitis reprehenderit repellendus porro molestias eum culpa exercitationem amet dolorum facere. Soluta facilis sed at, rem ratione, voluptates dicta sint vitae quia odit accusamus?
            Quia cupiditate exercitationem nulla dignissimos! Ratione assumenda recusandae nulla in corporis sit modi, impedit magni tempora eaque iure nemo libero accusantium enim, explicabo cum minima a. Perferendis nihil nisi debitis.
            Odit quasi atque totam ad fuga cupiditate quaerat eaque accusantium. Consectetur quae sit tenetur doloribus, veritatis modi. Soluta, error modi, delectus, at magnam nulla voluptate perferendis iure harum doloremque ullam.
            Voluptas, porro necessitatibus qui vel molestiae rerum nulla ratione. Consequatur odit eveniet asperiores sunt quas autem ab officiis, explicabo at quia debitis ipsa dolore tempora, earum velit! Magnam, quia. Error.
            Culpa, enim consectetur temporibus placeat fugiat nostrum? Cupiditate asperiores id ea dicta accusamus! Rerum, quam facere illo eaque nemo reiciendis distinctio amet sapiente eveniet officia fugit, repellat numquam recusandae pariatur.
            Dicta deserunt soluta, molestiae animi neque quae consequuntur dolore, sapiente rerum dolorem iste nostrum magni corrupti, inventore libero porro suscipit voluptatum cupiditate? Quaerat architecto sint, eius at adipisci optio vitae.
            Aliquam, soluta in. Nam illo dolore et consequuntur quis recusandae rerum fugiat cum numquam voluptatem, suscipit adipisci dignissimos voluptatum praesentium est debitis quasi totam deleniti accusantium voluptates optio iste quisquam?
            Velit debitis ullam qui ad quam! Illum quo incidunt, natus distinctio expedita perspiciatis, facere modi est quaerat vero non neque saepe cupiditate. Reprehenderit veritatis ex enim, sapiente facilis quae maxime.
            Suscipit accusantium incidunt harum nobis dolor, corrupti laudantium aut deserunt. Voluptas repellendus blanditiis aliquam accusantium repellat et, esse aspernatur, doloremque ducimus sapiente dolor deserunt, ullam doloribus sunt est soluta sint?
            Veniam, nihil tenetur aliquid temporibus excepturi necessitatibus dolorem consequuntur, quos quod non rem tempore facilis? Magnam dolore temporibus quis assumenda modi, eaque ex reiciendis quo dolor blanditiis similique illum tempora?</p>
            <Footer />
        </div>
    )

}