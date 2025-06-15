import { ConfigurationProvider } from "@/providers/configuration/configuration.provider";
import LanguageProvider from "@/providers/language/language.provider";

type Props = {
  children: React.ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
  return (
    <ConfigurationProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ConfigurationProvider>
  );
};

export default Providers;
