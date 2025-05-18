import { GithubIcon } from "@components/icons/brands/github.icon";
import pkg from "@pkg";
import React from "react";

/* Columns */
const SOCIAL: LinkInfo[] = [
  {
    label: "GitHub",
    href: pkg.repository.url,
    icon: (props) => <GithubIcon {...props} />,
  },
];

export const Footer: FC = () => {
  return (
    <footer className="bg-foreground py-2 flex justify-center items-center gap-12">
      <Column links={SOCIAL} />
    </footer>
  );
};

/* Internal */

type LinkInfo = {
  icon: (props: React.SVGProps<SVGSVGElement>) => ReactNode;
  label: string;
} & Pick<React.HTMLProps<HTMLAnchorElement>, "href">;

const Link: FC<LinkInfo> = ({ icon, label, href }) => {
  return (
    <a
      href={href}
      className="flex items-center justify-center gap-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon({ fill: "var(--background)", className: "h-6 w-6" })}
      <span className="text-background">{label}</span>
    </a>
  );
};

type ColumnProps = {
  links: LinkInfo[];
};

const Column: FC<ColumnProps> = ({ links }) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-full">
      {links.map((link) => (
        <Link key={link.href} {...link} />
      ))}
    </div>
  );
};
