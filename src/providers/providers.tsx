import LanguageProvider from "@/providers/language/language.provider";

type Props = {
  children: React.ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
  return <LanguageProvider>{children}</LanguageProvider>;
};

export default Providers;
