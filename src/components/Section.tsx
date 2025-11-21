import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  container?: boolean;
}

export default function Section({
  children,
  className,
  container = true,
  ...props
}: SectionProps) {
  return (
    <section className={cn("section", className)} {...props}>
      {container ? (
        <div className="container-custom">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
