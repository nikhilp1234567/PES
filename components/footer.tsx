import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import XLogoIcon from "./icons/x";
import { socialLinks } from "@/lib/constants";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex gap-6 items-center absolute bottom-[calc(var(--inset)+0.8rem)] md:bottom-[calc(var(--inset)+1.5rem)] left-1/2 -translate-x-1/2">
      <div className="items-center space-x-1 text-xs text-primary flex flex-col justify-center gap-2">
        <img src="/icon.svg" alt="Logo" className="w-4 h-4" />
        <span>© 2025 All rights reserved</span>
      </div>
      {/* <Link target="_blank" className={buttonVariants({ size: "icon-xl" })} href={socialLinks.instagram}>
        <InstagramLogoIcon className="size-6" />
      </Link>
      <Link target="_blank" className={buttonVariants({ size: "icon-xl" })} href={socialLinks.x}>
        <XLogoIcon className="size-6" />
      </Link>
      <Link target="_blank" className={buttonVariants({ size: "icon-xl" })} href={socialLinks.github}>
        <GitHubLogoIcon className="size-6" />
      </Link> */}
    </div>
  );
};
