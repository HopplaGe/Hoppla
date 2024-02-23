"use client";
import _MarkdownPreview from "@uiw/react-markdown-preview";

type MarkdownPreviewProps = {
  source: string;
};

export default function MarkdownPreview({ source }: MarkdownPreviewProps) {
  return (
    <_MarkdownPreview
      style={{
        backgroundColor: "transparent",
        color: "inherit",
        fontFamily: "inherit",
      }}
      source={source}
    />
  );
}
