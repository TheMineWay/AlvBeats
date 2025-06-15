import { ConfigurationProvider } from "@/providers/configuration/configuration.provider";
import LanguageProvider from "@/providers/language/language.provider";
import { PostProviders } from "@/providers/post-providers";

type Props = {
  children: React.ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
  return (
    <ConfigurationProvider>
      <LanguageProvider>
        <PostProviders>{children}</PostProviders>
      </LanguageProvider>
    </ConfigurationProvider>
  );
};

export default Providers;
