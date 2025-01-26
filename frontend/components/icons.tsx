import {
  LucideProps,
  Moon,
  SunMedium,
  type icons as LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/public/svg/logo.svg";


export type Icon = typeof LucideIcon;

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  logo: (props: LucideProps) => (

    <Image
      src={Logo} alt="Logo" width={300} height={80} id="logo" priority
    />
  ),
};
