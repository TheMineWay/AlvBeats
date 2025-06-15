import { useTheme } from "@components/layout/navigation/actions/use-theme";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export const PostProviders: FC<Props> = ({ children }) => {
  const { applyTheme, theme } = useTheme();

  useEffect(() => applyTheme(), [theme, applyTheme]);

  return children;
};
