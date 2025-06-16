import { useShare } from "@/shared/utils/share/use-share";
import { GithubIcon } from "@components/icons/brands/github.icon";
import { Button } from "@components/ui/button";
import { useTranslation } from "@i18n/use-translation";
import pkg from "@pkg";
import { Rocket, Share2 } from "lucide-react";
import React from "react";

const ITEM_CLASS = "flex items-center justify-center gap-2";

/* Columns */
const SOCIAL: Item[] = [
  {
    type: "url",
    label: "GitHub",
    href: pkg.repository.url,
    icon: (props) => <GithubIcon {...props} />,
  },
];

const INFO: Item[] = [
  {
    type: "url",
    label: pkg.version,
    href: pkg.repository.url + "/releases",
    icon: (props) => <Rocket {...props} />,
  },
];

export const Footer: FC = () => {
  const { t } = useTranslation("layout");
  const { isShareSupported, share } = useShare();

  const SHARE: Item[] = [
    {
      type: "btn",
      label: t().footer.Share,
      onClick: () => {
        share({
          title: pkg.name,
          text: pkg.description,
          url: pkg.homepage,
        });
      },
      icon: (props) => <Share2 {...props} />,
    },
  ];

  return (
    <footer className="bg-foreground py-2 flex justify-center items-center gap-12">
      <Column links={SOCIAL} />
      <Column links={INFO} />
      {isShareSupported && <Column links={SHARE} />}
    </footer>
  );
};

/* Internal */

type Url = BaseInfo & {
  type: "url";
  href: string;
};

type Btn = BaseInfo & {
  type: "btn";
  onClick: () => void;
};

type BaseInfo = {
  icon?: (props: React.SVGProps<SVGSVGElement>) => ReactNode;
  label: string;
};

type Item = Url | Btn;

const Link: FC<Url> = ({ icon, label, href }) => {
  return (
    <a
      href={href}
      className={ITEM_CLASS}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon?.({ fill: "var(--background)", className: "h-6 w-6" })}
      <span className="text-background">{label}</span>
    </a>
  );
};

const But: FC<Btn> = ({ icon, label, onClick }) => {
  return (
    <Button variant="ghost" className={ITEM_CLASS} onClick={onClick}>
      {icon?.({ fill: "var(--background)", className: "h-6 w-6" })}
      <span className="text-background">{label}</span>
    </Button>
  );
};

type ColumnProps = {
  links: Item[];
};

const Column: FC<ColumnProps> = ({ links }) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-full">
      {links.map((link) =>
        link.type === "btn" ? (
          <But key={link.label} {...link} />
        ) : (
          <Link key={link.href} {...link} />
        )
      )}
    </div>
  );
};
