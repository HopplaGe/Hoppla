"use client";

import { useMounted } from "@/hooks/useMounted";
import useZodFormPersistent from "@/hooks/useZodFormPersistent";
import ArticleSchema from "@/lib/validation/ArticleSchema";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import { useAddOrEditArticle } from "@/hooks/useAddOrEditArticle";
import ImageUploader from "@/components/shared/ImageUploader";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import MyAsyncCreatableSelect from "./MyAsyncCreatableSelect";
import { getArticleTags } from "@/lib/actions/articles";
import { useEffect } from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { BlockNoteEditor } from "@blocknote/core";
import { uploadImage } from "@/lib/actions/s3actions";

type AddOrEditArticleFormProps = {
  article?: Prisma.ArticleGetPayload<{
    include: { tags: true };
  }>;
  children?: React.ReactNode;
};

export default function AddOrEditArticleForm({
  article,
  children,
}: AddOrEditArticleFormProps) {
  const { form, values } = useZodFormPersistent<z.infer<typeof ArticleSchema>>({
    localStorageKey: `article-form${article ? `-${article.id}` : ""}`,
    schema: ArticleSchema,
    defaultValues: {
      picture: article?.picture || "",
      title: article?.title || "",
      content: article?.content || "",
      heading: article?.heading || "",
      language: article?.language || "EN",
      tags: article?.tags?.map((tag) => tag.name) || [],
    },
  });

  const { onSubmit, submitting } = useAddOrEditArticle();
  const isMounted = useMounted();

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
      const saveBlocksAsHTML = async () => {
        const html: string = await editor.blocksToHTMLLossy(
          editor.topLevelBlocks
        );
        form.setValue("content", html);
      };
      saveBlocksAsHTML();
    },
  });

  const getBlocks = async () => {
    const blocks: any[] = await editor.tryParseHTMLToBlocks(
      values.content || ""
    );
    editor.replaceBlocks(editor.topLevelBlocks, blocks);
  };

  useEffect(() => {
    if (editor) {
      getBlocks();
    }
  }, [editor]);

  if (!isMounted) return <></>;
  return (
    <Form {...form}>
      <Button
        className="mb-8"
        onClick={async () => {
          form.reset({
            picture: article?.picture || "",
            title: article?.title || "",
            content: article?.content || "",
            heading: article?.heading || "",
            language: article?.language || "EN",
            tags: article?.tags?.map((tag) => tag.name) || [],
          });
          if (article) {
            const blocks: any[] = await editor.tryParseHTMLToBlocks(
              article.content
            );
            editor.replaceBlocks(editor.topLevelBlocks, blocks);
          } else {
            editor.replaceBlocks(editor.topLevelBlocks, []);
          }
        }}
      >
        Reset
      </Button>
      <form
        onSubmit={form.handleSubmit((v) => {
          if (!article) {
            form.reset({
              picture: "",
              title: "",
              content: "",
              heading: "",
              language: "EN",
              tags: [],
            });
          }
          editor.replaceBlocks(editor.topLevelBlocks, []);
          onSubmit(v, article?.id);
        })}
        className="space-y-8 fira-go"
      >
        <FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <ImageUploader
              defaultImage={
                field.value.length > 0
                  ? field.value
                  : "https://ik.imagekit.io/0ofixtqpt/143729/default-placeholder.png"
              }
              onImageUploaded={(v) => form.setValue("picture", v)}
            />
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <Input
              isRequired
              label="Title"
              {...field}
              placeholder="Enter Title..."
            />
          )}
        />
        <FormField
          control={form.control}
          name="heading"
          render={({ field }) => (
            <Input
              isRequired
              label="Heading"
              {...field}
              placeholder="Enter Heading..."
            />
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <BlockNoteView
              //   onChange={field.onChange}
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
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <Select
              isRequired
              label="Language"
              onChange={(e) => form.setValue("language", e.target.value as any)}
              selectedKeys={[field.value]}
              placeholder="Select Language..."
            >
              <SelectItem key="EN" value="EN">
                English
              </SelectItem>
              <SelectItem className="" key="KA" value="KA">
                Georgian
              </SelectItem>
            </Select>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <MyAsyncCreatableSelect
              value={field.value.map((tag) => ({
                label: tag,
                value: tag,
              }))}
              onChange={(e) =>
                form.setValue(
                  "tags",
                  e.map((tag) => tag.value)
                )
              }
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
            />
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
