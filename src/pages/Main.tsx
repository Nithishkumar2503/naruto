import { SEO } from "../components";
import { HeroSection, CategoryCard } from "../components";

const categories = [
  { id: "1", title: "Characters", img: "/characters.png" },
  { id: "2", title: "Clans", img: "/clan.png" },
  { id: "3", title: "Villages", img: "/leaflogo.png" },
  { id: "4", title: "Kekkei Genkai", img: "/kekkei-genkai.png" },
  { id: "5", title: "Tailed Beasts", img: "/tail-beast.png" },
  { id: "6", title: "Teams", img: "/teams.png" },
  { id: "7", title: "Akatsuki", img: "/akatsuki.png" },
  { id: "8", title: "Kara", img: "/kara.png" },
];

function Main() {
  return (
    <>
      <SEO
        title="Naruto Explorer - Discover the Hidden Leaf Universe"
        description="Explore the Naruto universe with characters, clans, villages, and Kekkei Genkai. Discover iconic shinobi, legendary powers, and hidden villages in one place."
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
      
      <HeroSection />
      
      <div className="relative z-10 min-h-screen pb-20 px-4 sm:px-6 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                title={category.title}
                img={category.img}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
