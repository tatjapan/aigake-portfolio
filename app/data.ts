type BtnList = {
    label: string;
    link: string;
    icon: string;
    newTab: boolean;

}
export const BtnList = [
    { label: "Home", link: "/", icon: "home", newTab: false },
    { label: "About", link: "/about", icon: "about", newTab: false },
    { label: "Works", link: "/works", icon: "works", newTab: false },
    { label: "Contact", link: "/contact", icon: "contact", newTab: false },
    {
        label: "Bluesky",
        link: "https://bsky.app/profile/aigake.bsky.social",
        icon: "bluesky",
        newTab: true,
    },
    {
        label: "X",
        link: "https://x.com/aigakexoxo",
        icon: "x",
        newTab: true,
    },
];