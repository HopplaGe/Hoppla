"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  useFormField,
} from "@/components/ui/form";
import ArticleSchema from "@/lib/validation/ArticleSchema";
import { createArticle, updateArticle } from "@/lib/actions/articles";
import { useEffect, useState } from "react";
import ImageUploader from "@/components/shared/ImageUploader";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
// import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
// import { usePokemonList } from "./usePokemonList";
import CreatableSelect from "react-select/creatable";
import { useMounted } from "@/hooks/useMounted";
import { useLocalStorage } from "@/hooks/useLocalStorage";
// import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

type ArticleAddPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

const defaultValues = {
  content: "",
  heading: "",
  language: "EN",
  picture: "",
  tags: [],
  title: "",
} as z.infer<typeof ArticleSchema>;

export default function ArticleAddPage({
  params,
  searchParams,
}: ArticleAddPageProps) {
  const [values, setValues] = useLocalStorage<
    Partial<z.infer<typeof ArticleSchema>>
  >("ArticleAddPage", defaultValues);
  //   const editor: BlockNoteEditor = useBlockNote({});

  const form = useForm<z.infer<typeof ArticleSchema>>({
    resolver: zodResolver(ArticleSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(values);
    form.watch((v) => {
      setValues(v as any);
    });
  }, []);

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: z.infer<typeof ArticleSchema>) => {
    console.log(values);
    setSubmitting(true);
    await updateArticle("clsrvxbwm000bz1exsihlqh7q", values);
    setSubmitting(false);
  };

  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <Form {...form}>
      <h2 className="font-bold text-xl mb-4 fira-go">Add Article</h2>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 fira-go"
      >
        <FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageUploader
                  defaultImage="https://ik.imagekit.io/0ofixtqpt/143729/default-placeholder.png"
                  onImageUploaded={(v) => {
                    field.onChange({
                      target: {
                        value: v,
                      },
                    });
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  isRequired
                  label="Title"
                  {...field}
                  placeholder="Enter Title..."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  isRequired
                  label="Content"
                  {...field}
                  placeholder="Enter Content..."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="heading"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  isRequired
                  label="Heading"
                  {...field}
                  placeholder="Enter Heading..."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  defaultSelectedKeys={[field.value]}
                  isRequired
                  label="Language"
                  {...field}
                  placeholder="Select Language..."
                >
                  <SelectItem key="EN" value="EN">
                    English
                  </SelectItem>
                  <SelectItem key="KA" value="KA">
                    Georgian
                  </SelectItem>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CreatableSelect
                  //   id="react-select-3-live-region"
                  defaultValue={field.value.map((tag) => ({
                    label: tag,
                    value: tag,
                  }))}
                  onChange={(e) => {
                    field.onChange({
                      target: {
                        value: e.map((tag) => tag.value),
                      },
                    });
                  }}
                  isMulti
                  //   TODO: add dynamic
                  options={[
                    { label: "Entertainment", value: "Entertainment" },
                    { label: "Media", value: "Media" },
                    { label: "Marketing", value: "Marketing" },
                  ]}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          isDisabled={submitting}
          color="primary"
          variant="solid"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
