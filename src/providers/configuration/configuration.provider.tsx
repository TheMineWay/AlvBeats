import {
  Configuration,
  CONFIGURATION_CONTEXT,
  CONFIGURATION_SCHEMA,
  DEFAULT_CONFIGURATION,
} from "@/providers/configuration/configuration.context";
import { mainStorage } from "@/utils/storage/main-storage.service";
import { useState } from "react";

const KEY = "config";

type Props = {
  children: React.ReactNode;
};

export const ConfigurationProvider: FC<Props> = ({ children }) => {
  const [configuration, setConfiguration] = useState<Configuration>(
    getConfiguration()
  );

  const managedSetConfiguration = (newConfig: Configuration) => {
    setConfiguration(newConfig);
    try {
      mainStorage.set<Configuration>(KEY, newConfig, CONFIGURATION_SCHEMA);
    } catch {
      setConfiguration(DEFAULT_CONFIGURATION);
    }
  };

  return (
    <CONFIGURATION_CONTEXT.Provider
      value={{ configuration, setConfiguration: managedSetConfiguration }}
    >
      {children}
    </CONFIGURATION_CONTEXT.Provider>
  );
};

const getConfiguration = (): Configuration => {
  try {
    return (
      mainStorage.get<Configuration>(KEY, CONFIGURATION_SCHEMA) ??
      DEFAULT_CONFIGURATION
    );
  } catch {
    return DEFAULT_CONFIGURATION;
  }
};
