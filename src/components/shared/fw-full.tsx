import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function FwIconFull(props: { className: string }) {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "light" ? "/fw-full-dark.png" : "/fw-full-light.png"}
      alt="Freshworks Global Giving"
      className={cn("", props.className)}
      width={75}
      height={100}
    />
  );
}
