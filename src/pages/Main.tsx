import { SEO } from "../components";

const mainItem = [
  { id: "1", title: "Characters", img: "/characters.png" },
  { id: "2", title: "Clans", img: "/clan.png" },
  { id: "3", title: "Villages", img: "/leaflogo.png" },
  { id: "4", title: "Kekkei-Genkai", img: "/kekkei-genkai.png" },
  { id: "5", title: "Tailed-Beasts", img: "/tail-beast.png" },
  { id: "6", title: "Teams", img: "/teams.png" },
  { id: "7", title: "Akatsuki", img: "/akatsuki.png" },
  { id: "8", title: "Kara", img: "/kara.png" },
];

const mainList = mainItem.map((val) => (
  <div
    key={val.id}
    className="w-full h-44 sm:h-52  lg:h-60 rounded-lg  text-center bg-secondary p-3 shadow-sm  hover:scale-102 transition-transform duration-300 overflow-hidden"
  >
    <a
      href={`/${val.title.toLowerCase()}`}
      className="flex h-full flex-col rounded-lg bg-primary"
    >
      <div className="flex-1 flex items-center justify-center overflow-hidden rounded-lg">
        <img
          src={val.img}
          alt={val.title}
          className="h-full p-2 hover:scale-105 w-full object-contain"
        />
      </div>
      <div className="pt-2 text-sm sm:text-base text-white p-2 md:text-lg font-medium">
        {val.title}
      </div>
    </a>
  </div>
));

function Main() {
  return (
    <>
      <SEO
        title="Explore the World of Naruto"
        description="Discover the Naruto universe with characters, clans, villages, and Kekkei Genkai. Explore iconic shinobi, legendary powers, and hidden villages in one place."
        keywords="Naruto, Naruto characters, Naruto clans, Naruto villages, Kekkei Genkai, anime, Naruto universe, shinobi, hidden leaf village"
        image="https://naruto-lovat-nine.vercel.app/default-og-image.jpg"
        url="https://naruto-lovat-nine.vercel.app/"
        type="website"
        author="Naruto Universe"
        robots="index, follow"
        canonical="https://naruto-lovat-nine.vercel.app/"
        siteName="Naruto Universe"
        twitterCard="summary_large_image"
        twitterCreator="@narutouniverse"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Naruto Universe",
          url: "https://naruto-lovat-nine.vercel.app/",
          description:
            "Discover the Naruto universe with characters, clans, villages, and Kekkei Genkai.",
        }}
      />
      <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-background">
        <img
          src="/naruto-title.png"
          className="mx-auto w-32 sm:w-48 md:w-64 lg:w-80 mb-6"
          alt="Naruto Title"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mainList}
        </div>
      </div>
    </>
  );
}

export default Main;
