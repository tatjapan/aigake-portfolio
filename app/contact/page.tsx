import Image from "next/image";
import bg from "../../public/background/home-background.webp"
import HomeBtn from '@/components/HomeBtn';
import Form from "@/components/contact/Form";


export default function Contact() {
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

            {/* Homeボタン */}
            <HomeBtn />

            {/* コンテンツ */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
                <article className="relative w-full flex flex-col items-center justify-center space-y-8">
                    <div className="flex flex-col items-center justify-center space-y-6 w-3/4">
                        <h1 className="text-accent font-semibold text-center text-4xl capitalize">Contact</h1>
                        <p className="text-center font-light">
                            お問い合わせの返信はGmailからお送りいたします。また返信にお時間を頂く場合もございますこと予めご了承ください。
                        </p>
                        <Form />
                    </div>
                </article>

            </div>
        </main >
    );
}
