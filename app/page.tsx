import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { poppins } from "./ui/fonts";
import Image from "next/image";
import styles from "@/app/ui/home.module.css";

// Import Font Awesome icons (or any other icon library you're using)
import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex h-20 shrink-0 items-center justify-between bg-green-500 p-4 md:h-35">
        <Image src="/logo.png" alt="logo" height={80} width={200} />

        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>

      <div className="flex w-full" style={{ height: "10px" }}>
        <div className="flex-1 bg-green-500"></div>
        <div className="flex-1 bg-yellow-500"></div>
        <div className="flex-1 bg-blue-500"></div>
        <div className="flex-1 bg-pink-500"></div>
      </div>

      {/* Full-Width Section with Background Image */}
      <section className="relative w-full flex items-center justify-start text-white p-6 md:p-10 h-[400px] md:h-[600px] overflow-hidden">
        <Image
          src="/background-image.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={80}
          className="absolute inset-0 z-0 w-full h-full"
        />
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Services</h2>
          <p className="mb-6 text-sm md:text-base">
            We provide top-notch solutions for platform engineering, AI, and real-time analytics to boost your business efficiency.
          </p>
          <Link
            href="/services"
            className="inline-block px-4 md:px-6 py-2 md:py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Machinery Section */}
      <section className="my-6 md:my-12">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-2">Nearby Machinery Available</h2>
        <p className="text-center font-normal mb-6 text-sm md:text-base"> Find and book machinery near you.</p>
        <div className="flex justify-start md:justify-center gap-4 md:gap-8 overflow-x-auto py-4 px-4">
          {/* Circular Machinery Images with Titles */}
          {["machinery1", "machinery2", "machinery3", "machinery4", "machinery5"].map((machinery, index) => (
            <div key={index} className="flex flex-col items-center min-w-[100px]">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden">
                <Image
                  src={`/${machinery}.png`}
                  alt={`Machinery ${index + 1}`}
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
              <p className="text-center text-xs md:text-base">{["Harvesters", "Drones", "Tractors", "Seeders", "Other Equipments"][index]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="my-6 md:my-12">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">Empowering Indian Farmers</h2>
        <p className="text-center text-sm md:text-base mb-10">
          Discover the benefits of our innovative agricultural machinery booking platform designed specifically for Indian farmers.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
          {/* Images Section */}
          {[
            { src: "/solution1.png", alt: "Solution 1" },
            { src: "/solution2.png", alt: "Solution 2" },
            { src: "/solution3.png", alt: "Solution 3" },
            { src: "/solution4.png", alt: "Solution 4" }
          ].map((solution, index) => (
            <div key={index} className={`flex justify-${index % 2 === 0 ? "end" : "start"}`}>
              <div className="w-[500px] h-[200px]">
                <Image
                  src={solution.src}
                  alt={solution.alt}
                  width={500}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link
            href="/solutions"
            className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400"
          >
            Discover More
          </Link>
        </div>
      </section>
    </main>
  );
}
