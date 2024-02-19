"use client";
import { z } from "zod";
import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import ArticleSchema from "@/lib/validation/ArticleSchema";
import { getArticleTags, updateArticle } from "@/lib/actions/articles";
import { useEffect, useState } from "react";
import ImageUploader from "@/components/shared/ImageUploader";
import CreatableSelect from "react-select/creatable";
import { useMounted } from "@/hooks/useMounted";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import useZodFormPersistent from "@/hooks/useZodFormPersistent";
import { uploadImage } from "@/lib/actions/s3actions";
import AsyncCreatableSelect from "react-select/async-creatable";

type ArticleAddPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ArticleAddPage({
  params,
  searchParams,
}: ArticleAddPageProps) {
  const { form, values } = useZodFormPersistent<z.infer<typeof ArticleSchema>>({
    localStorageKey: "article-add",
    schema: ArticleSchema,
    defaultValues: {
      picture: "",
      title: "",
      content: "",
      heading: "",
      language: "EN",
      tags: [],
    },
  });

  const editor: BlockNoteEditor = useBlockNote({
    uploadFile(file) {
      return new Promise(async (resolve, reject) => {
        if (file.type.startsWith("image/")) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const fileUrl = await uploadImage(buffer.toJSON(), file.name);
          resolve(fileUrl);
        } else {
          reject("Invalid file type");
        }
      });
    },
    onEditorContentChange: (editor) => {
      const saveBlocksAsMarkdown = async () => {
        const markdown: string = await editor.blocksToMarkdownLossy(
          editor.topLevelBlocks
        );
        form.setValue("content", markdown);
      };
      saveBlocksAsMarkdown();
    },
  });

  useEffect(() => {
    if (editor) {
      const getBlocks = async () => {
        const blocks: any[] = await editor.tryParseMarkdownToBlocks(
          values.content || ""
        );
        // TODO: when md to blocks, image is not parsed
        editor.replaceBlocks(editor.topLevelBlocks, blocks);
      };
      getBlocks();
    }
  }, [editor]);

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: z.infer<typeof ArticleSchema>) => {
    console.log(values);
    setSubmitting(true);
    await updateArticle("clsrvxbwm000bz1exsihlqh7q", values);
    setSubmitting(false);
  };

  const isMounted = useMounted();

  // if (!isMounted) return null;

  return (
    <Form {...form}>
      <h2 className="font-bold text-xl mb-4 fira-go">Add Article</h2>
      <Button
        className="mb-10"
        onClick={() => {
          form.reset({
            picture: "",
            title: "",
            content: "",
            heading: "",
            tags: [],
          });
          editor.replaceBlocks(editor.topLevelBlocks, []);
        }}
      >
        Reset
      </Button>
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
                  defaultImage={
                    field.value.length > 0
                      ? field.value
                      : "https://ik.imagekit.io/0ofixtqpt/143729/default-placeholder.png"
                  }
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
                <div className="bg-[#f4f4f5] py-3 rounded-xl">
                  <BlockNoteView
                    onChange={field.onChange}
                    theme={{
                      fontFamily: "FiraGO",
                      colors: {
                        editor: {
                          background: "#f4f4f5",
                          text: "#000",
                        },
                        sideMenu: "rgb(82,82,91)",
                      },
                    }}
                    editor={editor}
                  />
                </div>
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
                  <SelectItem className="" key="KA" value="KA">
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
                <AsyncCreatableSelect
                  isClearable
                  menuPlacement="auto"
                  // theme={(theme) => ({
                  //   ...theme,
                  //   borderRadius: 0.7,
                  //   spacing: {
                  //     baseUnit: 8,
                  //     controlHeight: 32,
                  //     menuGutter: 8,
                  //   },
                  //   colors: {
                  //     ...theme.colors,
                  //     primary25: "hotpink",
                  //     primary: "black",

                  //   },
                  // })}
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      height: "100%",
                      backgroundColor: "#f4f4f5",
                      border: `none`,
                      padding: "0.7rem 0.2rem",
                      borderRadius: "0.7rem",
                      boxShadow: "none",
                      ":hover": {
                        ...base[":hover"],
                        backgroundColor: "#E4E4E7",
                      },
                      cursor: "pointer",
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "black",
                      scale: "0.8",
                    }),
                    indicatorSeparator: (base) => ({
                      ...base,
                      display: "none",
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "white",
                      border: `1px solid #E4E4E7`,
                      borderRadius: "0.7rem",
                      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                      padding: "0.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      zIndex: 100,
                    }),
                    option: (base) => ({
                      ...base,
                      backgroundColor: "transparent",
                      border: `none`,
                      padding: "0.3rem 0.5rem",
                      cursor: "pointer",
                      borderRadius: "0.7rem",

                      height: "100%",
                      ":hover": {
                        ...base[":hover"],
                        backgroundColor: "#E4E4E7",
                      },
                    }),
                  }}
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
                  loadOptions={(inputValue, callback) => {
                    getArticleTags().then((tags) => {
                      callback(
                        tags
                          .filter((tag) =>
                            tag.name
                              .toLocaleLowerCase()
                              .includes(inputValue.toLocaleLowerCase())
                          )
                          .map((tag) => ({
                            label: tag.name,
                            value: tag.name,
                          }))
                      );
                    });
                  }}
                  cacheOptions
                  defaultOptions
                  //   TODO: add dynamic
                  // options={}
                  // options={[
                  //   { label: "Entertainment", value: "Entertainment" },
                  //   { label: "Media", value: "Media" },
                  //   { label: "Marketing", value: "Marketing" },
                  // ]}
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
