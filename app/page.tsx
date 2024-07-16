import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FilterIcon, LocateIcon, SearchIcon } from "@/components/icons";
import Link from "next/link";
import getAllProperties from "@/lib/actions/properties/getAllProperties";
import CustomSearch from "@/components/CustomSearch";
import CookieComponent from "@/components/CookieComponent";
import { Property } from "@prisma/client";
import { cn } from "@/lib/utils";
import PropertyMainCard from "@/components/PropertyMainCard";

export interface PropertyCustom extends Property {
  urls: string[];
}

export default async function Home() {
  const properties = await getAllProperties();

  return (
    <>
      <CookieComponent />
      <div className="flex-1">
        <div className="fixed top-1/2 z-[999] flex items-center justify-center rounded-[32px]">
          <CustomSearch />
        </div>
        <section
          className={cn(
            "relative m-auto h-screen w-full overflow-hidden dark:bg-gray-800 md:max-h-full md:pt-16 lg:pt-[58px]",
          )}
        >
          <div className="searchBar">
            <div>
              <div className="searchBarInner">
                <div className="flex justify-center">
                  <button className="searchBarButton">Properties</button>
                  <button className="searchBarButton">Properties</button>
                  <button className="searchBarButton">Properties</button>
                </div>
              </div>
            </div>
          </div>
          <div className="customOverflow relative flex w-full pt-[135px]">
            <div className="w-1/2 border border-black px-[3.5rem] customFlex">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur impedit, iusto, sed optio eum eveniet dolorem magni
              incidunt quibusdam repudiandae placeat animi a doloremque itaque
              amet minus corporis sapiente natus. Dicta, excepturi aperiam earum
              cumque libero hic recusandae incidunt corrupti accusamus vel, quod
              placeat temporibus nihil voluptatibus similique assumenda magnam
              corporis harum. Perspiciatis, vel? Temporibus dolore inventore
              porro non minus. Iste, explicabo ea? Voluptatibus officiis ex
              minima dolorem omnis asperiores, veritatis doloribus assumenda
              totam optio distinctio tenetur voluptates cum? Sit deserunt
              voluptatibus expedita impedit ipsa suscipit blanditiis, commodi
              unde reprehenderit? Culpa impedit sed, laboriosam cum provident
              architecto doloremque suscipit. Cupiditate ipsam impedit nostrum
              animi blanditiis officiis quidem soluta minima, atque sapiente
              incidunt ipsum expedita nemo velit, dolore recusandae, excepturi
              nisi? Nostrum accusamus repellendus incidunt rerum nisi, ducimus
              atque corporis, doloremque, ullam ratione earum perferendis itaque
              minus tempora. Excepturi omnis, placeat eveniet voluptas dicta
              earum delectus. Numquam asperiores molestias impedit aliquid! Odio
              omnis praesentium, facere voluptatem exercitationem quod dolores
              voluptas voluptates quidem. Libero sed non ea voluptatem nisi
              maxime, animi eligendi, assumenda, at nemo distinctio! Quos ullam
              vero delectus exercitationem laudantium. Repudiandae adipisci
              minus deleniti harum tempora et unde facere, dolore, pariatur
              mollitia magnam, omnis ipsam quibusdam reprehenderit!
              Reprehenderit quas inventore maiores nulla corporis quod commodi
              nisi totam, sit expedita! Velit. Recusandae exercitationem velit
              animi qui facilis cumque porro iste accusantium, vitae iure
              architecto ullam error, officiis explicabo quas dicta odit maxime
              omnis nisi quos laboriosam rerum tempore! Nostrum, illo excepturi.
              Minus facilis excepturi, consequuntur voluptates aperiam hic,
              repudiandae ratione autem sit consectetur doloribus doloremque?
              Architecto, deserunt eveniet nisi harum tempora officiis excepturi
              est facere quas magnam neque minima quibusdam animi. Blanditiis
              temporibus consectetur voluptas excepturi officia doloremque
              obcaecati. Laborum quia ipsa sint similique, neque dicta
              voluptatibus aliquid quaerat sit exercitationem consequatur quidem
              culpa aut accusantium est repudiandae velit! Provident, nemo. Vel
              consectetur corrupti, amet nostrum dignissimos accusantium placeat
              vero rerum est, voluptates voluptatum maxime doloribus
              necessitatibus hic explicabo asperiores eum nobis assumenda culpa
              illum. Consequuntur numquam asperiores est corporis quasi? Culpa,
              fugit! Ea consequuntur neque aspernatur totam ipsum reiciendis
              fugiat cupiditate incidunt earum officiis asperiores minima
              repudiandae illo laboriosam, non blanditiis dolorum recusandae
              tempora ab quae. Praesentium culpa saepe quos? Placeat facilis in
              ullam quam corporis non consequuntur? Iure exercitationem adipisci
              quas facilis, necessitatibus soluta libero optio laboriosam at
              porro distinctio dignissimos, aspernatur ratione dolorum ipsa
              dolore, tenetur sunt voluptatum! Animi amet fugit aperiam. At
              porro neque adipisci maiores veniam animi odit deleniti inventore
              quo ad laboriosam, soluta rem pariatur quia autem excepturi
              doloremque sit ea nulla sequi dolor placeat. Neque nulla enim
              nesciunt quis a in dolorum ratione facere, vero accusamus
              provident quibusdam officiis rerum velit facilis eligendi error
              sapiente molestiae id. Architecto sunt est odio libero, facere
              veniam. Et, possimus quasi officia ipsum maiores animi laudantium
              nobis rem qui deleniti atque soluta commodi optio! Asperiores
              quidem sit esse doloribus cum, officia libero impedit, magnam rem
              voluptas nesciunt vitae! Eligendi numquam provident itaque dicta
              repellat culpa facere, quas rerum beatae, accusantium quos impedit
              deleniti delectus est, quasi quod architecto eius magni adipisci
              cum. Facilis voluptatem quia adipisci maxime corporis. Molestiae
              nulla possimus beatae vitae odio delectus aperiam fugiat fuga,
              ducimus ipsum illo magnam repudiandae ut tempora. Maiores quis
              voluptatum perspiciatis ea nam minus harum temporibus eligendi,
              error dolorum? Fuga. Sequi tempore quae pariatur nesciunt
              eligendi, facere nobis maiores placeat officiis, quas et hic animi
              sunt temporibus nulla quos debitis vel harum doloremque incidunt
              qui aperiam nemo. Sapiente, deleniti ab. Asperiores natus in cum
              corporis! Voluptatem voluptas, veniam tempore quas minima,
              doloremque libero quam nostrum quasi iusto culpa veritatis, quidem
              consequuntur? Excepturi, aperiam amet ab debitis fugit qui odit
              cumque? Fuga, sapiente deleniti et eum nisi praesentium amet vero
              necessitatibus! Laborum, omnis eaque et architecto quasi veritatis
              facilis debitis rerum veniam eveniet animi repellendus nam sed
              provident, labore vitae ullam! Quaerat necessitatibus, repellendus
              nesciunt unde, quam id possimus adipisci deleniti velit rerum,
              cumque nemo veniam! Distinctio eum quibusdam ex molestias
              doloremque velit recusandae, a dolores eligendi accusantium minima
              porro suscipit? Debitis quisquam ipsa molestias soluta dolorem
              nisi cupiditate voluptatem, facere veritatis architecto numquam
              doloribus est laborum deserunt, delectus tempore nemo ducimus
              maiores! Accusamus animi ducimus repudiandae deleniti a impedit
              ratione! Eos voluptatum mollitia nulla labore error architecto
              quis illo laboriosam, laudantium animi commodi perferendis
              excepturi, soluta, quam ipsa laborum nihil expedita! Odio, magni
              molestias. Iure est eveniet autem nam quibusdam! Quo debitis
              reprehenderit modi esse officiis nostrum sunt, odit eum quibusdam
              tenetur, in ex! Corrupti veritatis qui sapiente soluta beatae.
              Assumenda voluptatem corporis soluta tempora deleniti voluptatum
              expedita suscipit necessitatibus! Rerum at eveniet excepturi
              ducimus iusto atque assumenda et dolorum velit voluptate nam,
              neque, necessitatibus a rem. Placeat voluptas provident cumque
              amet, quam tempora similique, impedit, quo dolorem sequi nostrum.
              Error a explicabo odit recusandae voluptatem commodi esse officia
              aperiam excepturi? Quo necessitatibus a, doloremque dolorem
              corrupti similique, quaerat suscipit exercitationem illo assumenda
              cum magnam repellendus? Cum nulla ducimus minus! Nemo maxime enim
              fuga odio corrupti repellendus excepturi est officia expedita
              laudantium, sequi quas ullam repellat non praesentium corporis
              voluptatum delectus magni, nam ad explicabo accusantium veritatis
              inventore! Ullam, similique! Fugiat ad amet aut distinctio?
              Deleniti est explicabo sed blanditiis molestias maiores
              consectetur obcaecati sunt, sint numquam, nesciunt dolor corporis
              perferendis amet quo architecto! Corrupti alias provident sit
              tenetur odit. Commodi odio quis iusto consectetur ut adipisci.
              Minima, maiores eos soluta quis mollitia est obcaecati laudantium
              laborum eligendi hic labore aliquid debitis consequuntur illo
              repellat fugiat voluptate esse vitae non! Placeat enim est
              recusandae reiciendis provident iste debitis fuga nobis
              perferendis temporibus illum sapiente reprehenderit cum dicta
              expedita, quaerat nesciunt dolore? Impedit sapiente, laboriosam
              debitis neque quae cumque consequuntur rem. Alias placeat repellat
              adipisci harum impedit laboriosam iure, hic et. Quas quidem,
              explicabo eaque quae, totam molestiae eius cumque tempore
              aspernatur earum error et ipsa iusto voluptates perferendis at
              architecto. In corporis illo ex voluptas nobis vero tempore alias,
              ab repudiandae libero possimus cumque minus, enim porro iste
              adipisci. Itaque atque explicabo mollitia amet, quas rerum
              cupiditate aliquam dolorem tempore! Temporibus repellat
              repudiandae ducimus veritatis odio accusamus delectus veniam optio
              nulla reiciendis asperiores consectetur, est, quibusdam ad, unde
              corporis voluptatum voluptate iure assumenda! Officia veritatis
              praesentium distinctio tempore, vero ipsa? Minus recusandae
              praesentium esse magnam ratione. Molestias, vero. Reiciendis
              minima, praesentium eius reprehenderit eveniet at exercitationem
              amet suscipit laborum aliquam dolores cumque architecto quidem
              recusandae, ab odio quam necessitatibus asperiores? Ad eveniet
              quasi nostrum vero. Aut, facere eum. Reiciendis, commodi
              exercitationem repellat dolorem voluptatum aspernatur aliquam
              necessitatibus alias tempora blanditiis, assumenda nisi
              repellendus? Dolores natus explicabo, labore totam repudiandae
              unde? Totam, ad at. Laboriosam, pariatur. Dolorum fugit quibusdam
              tenetur, et cum exercitationem repellendus nostrum veritatis
              nobis, pariatur assumenda rerum repudiandae excepturi quos
              explicabo ab aliquid illum provident? Odit, officiis quod. Rem
              corrupti nisi quae. Commodi, provident necessitatibus ullam
              repudiandae aspernatur non, perspiciatis iusto eos eum cum eveniet
              at facilis, nisi soluta tempora veniam ea quaerat molestiae
              inventore illum quisquam ut. Corporis, soluta quod enim iusto
              consequatur reprehenderit ipsum quia libero maxime natus id. Error
              odit deserunt cum, ipsam vero a id! Quisquam maiores pariatur quo
              dolore culpa reiciendis doloribus. Accusamus. Nam repellendus
              necessitatibus dolorem odio adipisci maxime nisi doloribus nulla
              debitis? Officiis hic iusto beatae fuga neque, consequatur quae
              error odit, excepturi laboriosam, saepe possimus optio laborum
              perferendis deserunt minus? Mollitia, doloremque atque magnam ea
              sint officia aspernatur similique eveniet dicta voluptates. Esse
              recusandae quo quibusdam ipsam. Eum facilis, minus cumque culpa
              est quis tenetur. Id expedita aut accusantium eveniet! Praesentium
              error necessitatibus velit minus quae aperiam, nisi repellendus
              itaque maiores explicabo eaque doloremque corporis exercitationem
              laboriosam suscipit earum magnam quis animi pariatur doloribus
              rerum assumenda ullam cumque cum. Numquam! Nemo sit commodi
              quidem, voluptates doloribus iusto asperiores, repudiandae impedit
              corporis enim inventore fuga maxime! Neque, adipisci
              exercitationem possimus aliquid pariatur ducimus suscipit eligendi
              ipsum impedit sit, beatae atque error. Repellendus aperiam libero
              necessitatibus illum aut placeat ipsum error eveniet quaerat ea
              quibusdam ipsam magnam quas consequatur quos qui odio nihil quia
              deserunt dignissimos facilis expedita, eaque eos repudiandae.
              Quos! Aperiam, obcaecati pariatur laboriosam quisquam praesentium,
              earum reiciendis doloremque accusantium quaerat sint ad! Eligendi
              et, qui nulla alias consectetur, facere pariatur dolorem assumenda
              ut amet similique incidunt voluptates voluptate ullam! Odio sint,
              blanditiis praesentium sit veritatis sequi asperiores fugiat
              aliquid? In velit nam amet nesciunt soluta voluptas quaerat
              provident explicabo veniam officia expedita quam, commodi
              temporibus non. Ad, suscipit hic! Sit reprehenderit nobis,
              sapiente reiciendis alias doloribus ipsum ea ut natus, quae
              perferendis soluta ex maxime beatae corporis incidunt laborum
              temporibus amet sequi quos molestiae porro! Eum placeat hic iusto.
              Incidunt culpa commodi vel. Similique consequatur sequi, at, modi
              animi et asperiores blanditiis quis, excepturi voluptatibus
              quaerat quam ex? Delectus eos voluptatibus quasi facere, illum
              quod amet maxime corrupti alias? Rerum, excepturi quia. Nesciunt
              quos rerum magni expedita eaque? Soluta eaque accusantium unde
              nisi, tenetur fugit odit labore atque dicta nobis reiciendis
              ducimus, doloribus suscipit magnam rerum delectus nostrum
              adipisci? Iusto tenetur distinctio voluptatem molestias nostrum ab
              labore modi quisquam ea eaque fugit, dicta tempora? Non laudantium
              assumenda saepe? A reiciendis quo voluptates officia numquam velit
              facere dolore, sequi cum! Tenetur adipisci, tempore rem, autem
              reprehenderit nostrum deserunt voluptas exercitationem quidem odit
              ratione ullam similique porro suscipit corrupti! Libero aperiam
              laborum aut, debitis ipsam quisquam repellat earum beatae pariatur
              eum. Commodi expedita enim tenetur, provident impedit recusandae
              eius omnis non numquam in, reiciendis minima qui aspernatur
              distinctio voluptatibus dolorum voluptatum. Neque dolorem tempore
              tempora laboriosam enim, fugiat voluptatum molestias mollitia?
              Earum dolor pariatur repudiandae optio magnam esse quae voluptates
              laborum, corporis labore dolore, minima inventore voluptatibus ab
              iure culpa. Ad consequatur vel repellat maxime beatae voluptate
              exercitationem recusandae fuga doloribus! Similique unde quod
              delectus excepturi quibusdam. Officiis delectus facere fuga!
              Deleniti explicabo fugiat facere? Quam fugit commodi officiis
              distinctio, doloribus laudantium facilis deleniti. Facilis facere
              delectus modi culpa. Velit, exercitationem. Commodi ipsam optio
              excepturi debitis odit sed quam, iure id enim molestias explicabo
              omnis ad dolore assumenda! Minus tempore repellendus totam dolor
              quae minima velit, facilis dolorem vitae quod molestiae! Ipsa
              distinctio temporibus blanditiis at? Veniam ea cum, totam ipsum
              deleniti eveniet esse, consectetur, quod ab perspiciatis nostrum
              dignissimos! Iure itaque culpa ut eos? Quis natus aliquid at nihil
              saepe? Sed animi id optio numquam nam enim voluptatum? Incidunt
              maxime ullam repellat eum amet! Saepe quod perferendis eligendi
              quisquam! Non tenetur dolores dolorem esse quae quos eaque quam
              rem autem? Suscipit vitae, ab non facilis quos harum laborum sunt
              tempora sapiente inventore tempore facere voluptate eligendi alias
              beatae laudantium soluta fuga sequi corporis? Soluta, aut quam
              explicabo saepe vitae eaque? Facere omnis quae, incidunt eaque
              error sit, corporis qui ducimus esse tempora tenetur perferendis.
              Distinctio expedita quos voluptatem sequi ratione voluptatum
              labore architecto explicabo natus vel magni unde, quasi
              praesentium! Harum ad blanditiis quidem non earum veniam quaerat
              mollitia architecto fugiat nulla voluptates tempora deleniti
              facere recusandae necessitatibus provident ipsum, ducimus
              explicabo dolores atque enim cumque. Ipsa quos quo quam? Labore
              natus dolorum laudantium unde, minus pariatur nostrum, beatae ex
              itaque saepe officia illo repellat accusantium eum ratione! Ab
              dicta, rerum deserunt ea inventore accusamus dolore magni nam
              harum sapiente. Ipsum quam odio porro quidem illum velit qui, hic
              magnam libero error ipsam quasi! Optio exercitationem vero
              corporis quibusdam quo dolorum fugit reprehenderit impedit quas,
              dolore commodi eveniet recusandae! Est. Dolorem, atque dolore.
              Fugit eligendi sunt hic eveniet quam voluptas eius unde fugiat
              accusamus. Vitae sint minima maxime magnam magni fugiat deleniti
              repudiandae similique dolorum, rerum modi reiciendis illo
              repellat? Ullam, optio. Nemo molestias nam non at quod consectetur
              suscipit laboriosam quam nisi obcaecati, repudiandae atque ea
              totam, numquam sed cupiditate laborum pariatur tenetur rem
              corrupti autem? Laboriosam, voluptatibus totam. Dolor, molestiae
              reprehenderit? Eum eius omnis provident nostrum ducimus ipsam
              voluptatibus corrupti velit eligendi, unde, nesciunt autem eaque
              nemo, corporis fuga atque facilis id recusandae quia nihil culpa
              esse voluptas. Vel harum aliquam expedita corrupti saepe
              laboriosam, nisi praesentium autem rem facilis animi aperiam totam
              deleniti provident aspernatur similique rerum accusamus vero non
              ducimus repudiandae asperiores. Voluptates nam reiciendis aliquam.
              Tempore earum natus quibusdam quasi culpa nemo, asperiores rem
              incidunt dignissimos rerum magni atque esse officiis eveniet nobis
              veritatis minima, labore illo itaque. Aliquid omnis suscipit
              voluptas veritatis nemo maiores! Sint suscipit repellat similique,
              beatae quo itaque nemo, optio laborum at eos distinctio quibusdam
              natus eveniet praesentium reiciendis, incidunt qui quae maiores
              sunt. Eum labore a saepe minima illo expedita. Numquam perferendis
              ullam ea nesciunt magnam consectetur, incidunt iusto quia
              molestiae? Eaque aliquam, ab eius saepe numquam asperiores
              mollitia ducimus illum possimus! Vel, aut! Unde molestias sint
              veritatis eius nulla. Vitae facilis voluptatum libero quis
              cupiditate ratione, hic sit sed quisquam expedita officiis nihil.
              Provident, maiores quaerat. Ipsum, tenetur. Nisi architecto
              pariatur fugit aliquam dolorum quo deleniti nemo eveniet dolorem?
              Molestias pariatur ducimus eius error, optio repellat porro
              numquam quo aspernatur dolorum iure est atque iusto, modi tempora
              suscipit cupiditate dolorem. Eius, quaerat. Nemo deleniti,
              cupiditate repellendus beatae magnam quidem! Facilis, aspernatur
              perferendis! Doloribus ratione, laboriosam ad, atque numquam eaque
              saepe temporibus dignissimos hic, voluptas consectetur vitae sunt
              cum. Tempora provident sint blanditiis voluptates quaerat ea
              mollitia assumenda quasi iure. Laboriosam enim dolore, rerum
              perspiciatis magni molestiae qui! Ipsa earum, doloremque obcaecati
              atque eligendi cum minus nostrum! Facere veniam commodi nam
              repellendus fuga sit obcaecati provident eligendi. Modi, cumque
              perferendis. Explicabo vero est, et autem quia reiciendis, nam ea
              eos excepturi, iure sapiente soluta nulla dignissimos nobis fuga
              nisi a deserunt exercitationem dolorem id cumque. Fugiat laborum
              dolorum illum magni. Obcaecati, sunt sit voluptate maxime fuga,
              modi et vel iusto nam amet iste repellat odio commodi tempora
              rerum aliquid cum libero harum. Sit voluptatum omnis placeat, quod
              iusto quasi facere? Molestiae ipsam error sapiente animi, quasi
              enim nemo quam placeat voluptas at similique nesciunt porro, esse
              natus? Quod quasi praesentium explicabo accusamus quas nemo
              voluptatem velit, quo amet? Provident, at. Et ea corrupti quod
              sunt, quia eveniet recusandae. Eos hic officia impedit alias quod
              veniam. Dolorum iusto nostrum totam delectus commodi excepturi
              facilis minima consectetur odit, aliquam cum in rerum!
              Repellendus, quos? Quas repudiandae aut consectetur molestias,
              illo iusto nostrum reiciendis mollitia laboriosam quidem deleniti
              nulla adipisci ratione nihil. Sunt ratione fuga distinctio
              nesciunt velit enim dolorum quam ducimus corrupti! Minus, saepe
              quo aliquam dolorem facilis odio! Earum, at repudiandae. Ipsam
              deleniti laudantium odit eaque iusto laboriosam? Illo, quas
              pariatur explicabo exercitationem minus sequi accusantium,
              suscipit error id fuga vero! Quidem quas, repellat cumque cum fuga
              nesciunt nostrum, blanditiis quo aliquid, tempora culpa
              voluptatibus deleniti. Quo, odit molestias, dolorem officiis
              doloremque nam eius quibusdam atque odio tenetur ad ipsa nostrum!
              Quas ducimus voluptatem expedita. Ullam quisquam odit culpa
              reiciendis ipsa laborum quas a. Eligendi unde eaque, aspernatur
              illo aliquam omnis voluptas odio modi ipsum porro quo est
              consectetur, magnam cupiditate! Aspernatur quas consequuntur
              repellat distinctio ullam, voluptates quod necessitatibus ex esse
              sint. Sapiente repudiandae laudantium ipsa assumenda, repellat
              accusamus esse reiciendis animi obcaecati atque corrupti omnis.
              Sint blanditiis aliquam tempora. Libero reiciendis eum rem
              voluptates nulla inventore sapiente dolorum dolores autem
              praesentium fuga, necessitatibus consequatur delectus. Illum,
              velit minus similique eaque quidem quo nobis, eligendi odio vitae
              sapiente nesciunt suscipit. Nam consequatur, modi veniam dolore
              labore ullam consectetur nesciunt vel odio quaerat nobis in alias
              numquam quibusdam iste sequi fugiat animi autem! Excepturi hic,
              facilis perferendis quisquam harum corporis expedita. Vitae, a
              omnis asperiores quas iste cum blanditiis deleniti tenetur
              perferendis cupiditate fugiat animi quos, voluptatum eveniet ad
              voluptate sint accusamus recusandae quidem assumenda neque? Sint
              expedita impedit eos adipisci. Quos, voluptatem! Doloribus ducimus
              sapiente incidunt voluptatum rerum commodi exercitationem aliquam
              dicta quasi, unde dolores ut maiores reiciendis nemo magni, magnam
              corporis dolor quibusdam provident accusantium. Sunt nobis itaque
              et! Quod repellendus porro consequuntur at minus dolorum debitis
              explicabo ab sequi, voluptates autem eaque dignissimos sit
              laboriosam earum in possimus quaerat eum nemo suscipit tempore
              quas soluta. Vitae, nam magni? Eum quo sunt reprehenderit adipisci
              doloribus minus. Aut ratione sit cum porro quis consectetur
              molestias? Earum saepe fuga delectus expedita magnam, nam
              distinctio dolore! Consequuntur alias architecto dicta cumque in?
              Eum debitis ipsum voluptatum incidunt fuga architecto sed
              repellendus temporibus iure laudantium voluptate aliquam, qui
              sapiente voluptates quibusdam atque perspiciatis quod? Odio velit
              veritatis numquam sapiente, architecto quos magni corporis? Quis,
              est. Nobis, et accusantium reiciendis officiis doloribus sed animi
              ea est ducimus quas officia cum deserunt quod debitis nostrum
              optio praesentium mollitia, dignissimos harum. Fugit, provident
              non? Aspernatur, perferendis? Molestias eaque commodi
              necessitatibus? Libero eligendi dolor aspernatur dolore? Quos
              libero odio corporis hic tempora neque quam voluptates
              consectetur, numquam maiores deleniti harum quibusdam, ad
              veritatis repudiandae fuga vero natus? A rem sapiente fuga, qui,
              eum, incidunt ex reiciendis unde ratione distinctio aut laudantium
              quibusdam porro harum doloribus cupiditate nisi nobis? Autem
              repellat officiis doloribus libero? Maiores in unde quidem.
              Reprehenderit aspernatur ducimus consectetur distinctio provident
              vel unde nesciunt voluptatibus ipsum et aut blanditiis excepturi
              sint sapiente tempora corrupti asperiores voluptatum similique
              officia voluptates debitis, dolore commodi quo. Vero, in?
              Inventore expedita rem corporis fuga distinctio eaque. Debitis
              possimus quibusdam quos dolores non expedita enim nemo, assumenda
              nostrum a ab id corporis sapiente accusamus optio cum tenetur sed.
              Perspiciatis, soluta. Consequatur fuga minima tenetur dolor quidem
              quasi aliquam necessitatibus perferendis at, placeat ratione
              labore, illo sequi, eos repellat odit voluptatem earum sapiente
              distinctio. Obcaecati minus recusandae hic voluptatem deserunt
              cupiditate? Rem veritatis dolor architecto. Error praesentium,
              eaque architecto ratione corrupti repellat maxime a. Quaerat saepe
              dolorem, quod voluptate eligendi dolor optio nemo? Perspiciatis
              nam rem unde dolor, a ab. Autem. Accusamus eius non ipsum,
              excepturi corrupti vitae eveniet quae mollitia nisi pariatur quis
              voluptatibus sapiente eos sit dolores dolorum error soluta ducimus
              repellendus magni temporibus itaque, quisquam recusandae! Veniam,
              iure. Officiis omnis atque similique tempora maxime accusantium
              consequatur? Labore architecto omnis in corporis at, error
              reiciendis ex impedit eum ea provident porro qui repellat, nobis
              consequatur quos nulla! Quod, excepturi. Illum similique iure
              labore incidunt, accusamus aliquid reprehenderit ipsum minus
              laborum molestias officia accusantium quo neque quos non!
              Accusamus, rem quo. Earum, error molestias et laboriosam
              cupiditate odit debitis quasi? Nulla tempora ab consectetur. Velit
              minima vitae tempore harum. Nemo sapiente sequi eligendi veniam
              tenetur maxime, itaque magnam pariatur officiis, suscipit ex ad
              illum tempore recusandae porro reiciendis sed molestias!
            </div>
            <div className="customHeight sticky top-[8rem] h-full w-1/2 border border-black">
              Map
            </div>
          </div>
          {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {properties.map((property: PropertyCustom) => (
                <PropertyMainCard property={property} key={property.id} />
              ))}
            </div> */}
        </section>
      </div>
    </>
  );
}
