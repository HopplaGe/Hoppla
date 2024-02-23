import { getArticleTags } from "@/lib/actions/articles";
import _AsyncCreatableSelect from "react-select/async-creatable";

type MyAsyncCreatableSelectProps = {
  value?: {
    label: string;
    value: string;
  }[];
  onChange?: (newValue: { label: string; value: string }[]) => void;
  loadOptions?: (
    inputValue: string,
    callback: (options: any[]) => void
  ) => void;
};

export default function MyAsyncCreatableSelect({
  onChange,
  value,
  loadOptions,
}: MyAsyncCreatableSelectProps) {
  return (
    <_AsyncCreatableSelect
      isClearable
      menuPlacement="auto"
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
      value={value}
      onChange={onChange as any}
      isMulti
      loadOptions={loadOptions}
      cacheOptions
      defaultOptions
    />
  );
}
