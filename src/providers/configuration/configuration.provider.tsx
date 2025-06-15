import {
  Configuration,
  CONFIGURATION_SCHEMA,
  ConfigurationContext,
  DEFAULT_CONFIGURATION,
} from "@/providers/configuration/configuration.context";
import { LOCAL_STORAGE_CONNECTOR_KEY } from "@constants/storage/storage-services.constant";
import { WebWarehouse } from "@themineway/smart-storage-js";
import { useConnectorWatch } from "@themineway/smart-storage-react";
import { useCallback, useMemo } from "react";

const KEY = "config";

type Props = {
  children: React.ReactNode;
};

export const ConfigurationProvider: FC<Props> = ({ children }) => {
  const { value, connector } = useConnectorWatch<Configuration>(
    WebWarehouse.getConnector(LOCAL_STORAGE_CONNECTOR_KEY),
    KEY,
    CONFIGURATION_SCHEMA
  );

  const configuration = value ?? DEFAULT_CONFIGURATION;

  const setConfiguration = useCallback(
    (config: Configuration) => {
      connector.set<Configuration>(KEY, config, CONFIGURATION_SCHEMA);
    },
    [connector]
  );

  const managedSetConfiguration = (newConfig: Configuration) => {
    try {
      connector.set<Configuration>(KEY, newConfig, CONFIGURATION_SCHEMA);
    } catch {
      setConfiguration(DEFAULT_CONFIGURATION);
    }
    setConfiguration(newConfig);
  };

  const providerValue = useMemo(
    () => ({
      configuration,
      setConfiguration: managedSetConfiguration,
    }),
    [configuration, managedSetConfiguration]
  );

  return (
    <ConfigurationContext.Provider value={providerValue}>
      {children}
    </ConfigurationContext.Provider>
  );
};
