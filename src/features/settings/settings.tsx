import { cn } from "@/lib/utils";
import {
  Configuration,
  CONFIGURATION_SCHEMA,
} from "@/providers/configuration/configuration.context";
import { useConfiguration } from "@/providers/configuration/use-configuration";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Slider } from "@components/ui/slider";
import { Switch } from "@components/ui/switch";
import { THEMES } from "@constants/theme/themes.constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

const SECTION_TITLE_CLASS = "text-lg font-semibold";
const SECTION_CONTAINER_CLASS = "flex flex-col gap-4";
const SIDED_ITEM_CLASS = "flex items-center justify-between gap-2";

type Props = {
  onConfigApply?: CallableFunction;
};

export const Settings: FC<Props> = ({ onConfigApply }) => {
  const { t } = useTranslation("settings");
  const { setConfiguration } = useConfiguration();
  const configForm = useSettingsForm();

  // Actions*

  const submit = useCallback(
    (data: Configuration) => {
      setConfiguration(data);
      onConfigApply?.();
    },
    [setConfiguration]
  );

  // UI

  return (
    <Form {...configForm}>
      <form
        onSubmit={configForm.handleSubmit(submit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-6 w-full">
          <Theme form={configForm} />
          <Screen form={configForm} />
          <Lyrics form={configForm} />
        </div>
        <div className="flex gap-2 w-full justify-center">
          <Button className="w-full">{t().form.actions.Apply}</Button>
        </div>
      </form>
    </Form>
  );
};

/* SEGMENTS */

type SegmentProps = {
  form: ReturnType<typeof useSettingsForm>;
};

const Lyrics: FC<SegmentProps> = ({ form }) => {
  const { t } = useTranslation("settings");

  return (
    <div className={SECTION_CONTAINER_CLASS}>
      <h2 className={SECTION_TITLE_CLASS}>{t().form.sections.lyrics.Title}</h2>
      {/* Progress indicator */}
      <FormField
        control={form.control}
        name="player.lyricsProgress.showIndicator"
        render={({ field }) => (
          <FormItem className={SIDED_ITEM_CLASS}>
            <FormLabel>
              {t().form.sections.lyrics.fields["show-progress"].Label}
            </FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
      <hr />
      {/* Lyrics offsets */}
      <FormField
        control={form.control}
        name="player.lyricsOffset.anterior"
        render={({ field }) => (
          <SliderItem
            onChange={field.onChange}
            value={field.value ?? 0}
            max={3}
            label={t().form.sections.lyrics.fields["anterior-offset"].Label}
          />
        )}
      />
      <FormField
        control={form.control}
        name="player.lyricsOffset.posterior"
        render={({ field }) => (
          <SliderItem
            onChange={field.onChange}
            value={field.value ?? 0}
            max={3}
            label={t().form.sections.lyrics.fields["posterior-offset"].Label}
          />
        )}
      />

      <hr />
      {/* Timestamps */}
      <FormField
        control={form.control}
        name="player.lyricsTimestamps.showStart"
        render={({ field }) => (
          <FormItem className={SIDED_ITEM_CLASS}>
            <FormLabel>
              {t().form.sections.lyrics.fields["start-timestamp"].Label}
            </FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="player.lyricsTimestamps.showEnd"
        render={({ field }) => (
          <FormItem className={SIDED_ITEM_CLASS}>
            <FormLabel>
              {t().form.sections.lyrics.fields["end-timestamp"].Label}
            </FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

const Screen: FC<SegmentProps> = ({ form }) => {
  const { t } = useTranslation("settings");

  return (
    <div className={SECTION_CONTAINER_CLASS}>
      <h2 className={SECTION_TITLE_CLASS}>{t().form.sections.screen.Title}</h2>
      <FormField
        control={form.control}
        name="player.wakeLock"
        render={({ field }) => (
          <FormItem className={SIDED_ITEM_CLASS}>
            <FormLabel>
              {t().form.sections.screen.fields["wake-lock"].Label}
            </FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

const Theme: FC<SegmentProps> = ({ form }) => {
  const { t } = useTranslation("settings");

  return (
    <div className={SECTION_CONTAINER_CLASS}>
      <h2 className={SECTION_TITLE_CLASS}>{t().form.sections.theme.Title}</h2>
      <FormField
        control={form.control}
        name="theme.theme"
        render={({ field }) => (
          <FormItem className={SIDED_ITEM_CLASS}>
            <FormLabel>{t().form.sections.theme.fields.theme.Label}</FormLabel>
            <FormControl>
              <Select
                value={field.value ?? "default"}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={t().form.sections.theme.fields.theme.Label}
                  />
                </SelectTrigger>
                <SelectContent>
                  {THEMES.map((theme) => (
                    <SelectItem
                      value={theme}
                      key={theme}
                      className="flex items-center gap-2"
                    >
                      <span
                        className={cn(`bg-${theme}-200`, "h-4 w-4 rounded-xs")}
                      />
                      {
                        t().form.sections.theme.fields.theme.options[theme]
                          .Label
                      }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

/* Internal */

const useSettingsForm = () => {
  const { configuration } = useConfiguration();
  return useForm({
    defaultValues: configuration,
    resolver: zodResolver(CONFIGURATION_SCHEMA),
  });
};

const SliderItem: FC<{
  value: number;
  onChange: (v: number) => void;
  max?: number;
  label: string;
}> = ({ value, onChange, max, label }) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="flex gap-4">
          <Slider
            value={[value]}
            onValueChange={([v]) => onChange(v)}
            max={max}
          />
          <p>{value}</p>
        </div>
      </FormControl>
    </FormItem>
  );
};
