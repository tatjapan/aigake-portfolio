import Image from "next/image";
import bg from "../../public/background/home-background.webp"
import profileImg from '../../public/background/profile.webp';
import logo from '../../public/background/aigake logo.svg';
import HomeBtn from '@/components/HomeBtn';
import { FaXTwitter, FaBluesky } from 'react-icons/fa6';
import Link from 'next/link';

export default function About() {
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
                {/* プロフィール画像＋ロゴ */}
                <section className="flex flex-col items-center justify-center gap-4 mb-12">
                    <Image
                        src={profileImg}
                        alt="プロフィール画像"
                        width={180}
                        height={180}
                        className="rounded-full"
                    />
                    <Image
                        src={logo}
                        alt="Aigake ロゴ"
                        width={160}
                        height={60}
                        className="h-auto"
                    />
                </section>

                {/* 紹介文 */}
                <section className="max-w-3xl text-center leading-relaxed text-base sm:text-lg">
                    <p className="mb-4">
                        あいがけは、百合をこよなく愛するAIアーティストです。
                    </p>
                    <p className="mb-8">
                        Stable Diffusionを使って百合をテーマにしたイラストを制作🎨✨
                        女性同士の恋愛模様や敬愛のある風景を描いています💕
                    </p>

                    {/* SNSアイコン */}
                    <div className="flex justify-center gap-x-6 text-2xl">
                        <Link
                            href="https://x.com/aigakexoxo"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X"
                            className="hover:text-accent transition"
                        >
                            <FaXTwitter />
                        </Link>
                        <Link
                            href="https://bsky.app/profile/aigake.bsky.social"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Bluesky"
                            className="hover:text-accent transition"
                        >
                            <FaBluesky />
                        </Link>
                    </div>
                </section>
            </div>
        </main >
    );
}
