import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function FwIcon(props: { className: string }) {
  const { theme } = useTheme();

  if (theme === "dark") {
    return (
      <Image
        src={"/fw-bg-dark.svg"}
        alt="Freshworks Global Giving"
        className={cn("", props.className)}
        width={200}
        height={200}
      />
    );
  }

  return (
    <Image
      src={"/fw-bg-light.svg"}
      alt="Freshworks Global Giving"
      className={cn("", props.className)}
      width={200}
      height={200}
    />
  );
}
