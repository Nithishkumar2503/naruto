import { SEO } from "../components";

const about = () => {
  return (
    <div className=" ">
      <SEO
  title="About Naruto Universe"
  description="Learn about Naruto Universe, a fan-made platform built to explore Naruto characters, clans, villages, and special abilities in a clean and interactive way."
  keywords="About Naruto Universe, Naruto fan website, Naruto anime site, Naruto world, Naruto information"
  image="https://naruto-lovat-nine.vercel.app/default-og-image.jpg"
  url="https://naruto-lovat-nine.vercel.app/about"
  type="website"
  author="Naruto Universe"
  robots="index, follow"
  canonical="https://naruto-lovat-nine.vercel.app/about"
  siteName="Naruto Universe"
  twitterCard="summary_large_image"
  twitterCreator="@narutouniverse"
  structuredData={{
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Naruto Universe",
    url: "https://naruto-lovat-nine.vercel.app/about",
    description:
      "A fan-made platform to explore Naruto characters, clans, villages, and special abilities.",
  }}
/>
      <h1 className="text-center lg:pb-10 pb-2 font-semibold text-3xl text-white">
        About us
      </h1>
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-zinc-950 rounded-lg text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              About Naruto Universe
            </h2>
            <p className="text-zinc-300 text-lg leading-8 mb-8">
              Naruto Universe is a fan-made website created to explore the world
              of Naruto in a clean and interactive way. From legendary
              characters and powerful clans to hidden villages and unique Kekkei
              Genkai, this platform brings together important parts of the
              Naruto series in one place.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                <h3 className="text-primary font-semibold mb-2">
                  Characters
                </h3>
                <p className="text-sm text-secondary">
                  Explore iconic shinobi and their stories.
                </p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                <h3 className="text-primary font-semibold mb-2">Clans</h3>
                <p className="text-sm text-secondary">
                  Learn about legendary Naruto clans.
                </p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                <h3 className="text-primary font-semibold mb-2">Villages</h3>
                <p className="text-sm text-secondary">
                  Discover the hidden villages and their history.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="/characters.png"
              alt="Naruto about section"
              className="w-full max-w-md object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default about;
