import common from "./common.json";
import homepage from "./homepage.json";
import layout from "./layout.json";
import settings from "./settings.json";
import songImport from "./song-import.json";
import songPlayer from "./song-player.json";
import songScriptPlayer from "./song-script-player.json";
import songSearch from "./song-search.json";

const CA_ES = {
  common,
  layout,
  homepage,
  "song-search": songSearch,
  "song-player": songPlayer,
  "song-import": songImport,
  "song-script-player": songScriptPlayer,
  settings,
};

export default CA_ES;
