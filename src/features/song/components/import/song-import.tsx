import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { SongUploadImport } from "@features/song/components/import/modes/song-upload-import";
import { useTranslation } from "@i18n/use-translation";

const TABS = {
  upload: "upload",
  url: "url",
} satisfies Record<string, string>;

export const SongImport: FC = () => {
  const { t } = useTranslation("song-import");

  return (
    <Tabs defaultValue={TABS.upload} className="w-full">
      <TabsList>
        <TabsTrigger value={TABS.upload}>
          {t().importer.modes.upload.Title}
        </TabsTrigger>
        <TabsTrigger value={TABS.url} disabled>
          {t().importer.modes.url.Title}
        </TabsTrigger>
      </TabsList>
      <TabsContent value={TABS.upload}>
        <SongUploadImport />
      </TabsContent>
      <TabsContent value={TABS.url}>
        <p>Import from URL is not yet implemented.</p>
      </TabsContent>
    </Tabs>
  );
};
