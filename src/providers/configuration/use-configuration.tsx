import { CONFIGURATION_CONTEXT } from "@/providers/configuration/configuration.context";
import { useContext } from "react";

export const useConfiguration = () => {
  const context = useContext(CONFIGURATION_CONTEXT);

  if (!context) {
    throw new Error(
      "useConfiguration must be used within a ConfigurationProvider"
    );
  }
  return context;
};
