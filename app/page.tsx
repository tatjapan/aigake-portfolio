import Image from "next/image";
import bg from "../public/background/home-background.png"
import ft from "../public/background/front.png"
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 背景画像は absolute で配置 + opacity */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bg}
          alt="background-image"
          fill
          className="object-cover object-center opacity-50"
        />
      </div>

      {/* 前景（キャラ） */}
      <div className="z-10">
        <Image
          src={ft}
          alt="aigake"
          width={400}
          height={800}
          className="object-contain"
          priority
        />
      </div>
      <Navigation />
    </main>
  );
}
