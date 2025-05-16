import Image from "next/image";
import bg from "../../public/background/home-background.webp"
import WorkList from "@/components/works/WorkList";
import HomeBtn from "@/components/HomeBtn";


export default function Works() {
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
            <HomeBtn />
            <WorkList />
        </main>
    );
}
