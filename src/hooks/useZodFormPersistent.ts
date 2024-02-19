import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { z } from "zod";
import { DeepPartial, DefaultValues, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// type useZodFormPersistentProps = {
//   schema: z.Schema<any>;
//   defaultValues: DefaultValues<any>;
//   localStorageKey: string;
//   callback?: (v: DeepPartial<T>) => void;
// };

export default function useZodFormPersistent<T extends FieldValues>(
  { schema, defaultValues, localStorageKey}: {
    schema: z.Schema<any>;
    defaultValues: DefaultValues<
      T
    >;
    localStorageKey: string;
  }
) {
      const [values, setValues] = useLocalStorage<
      DeepPartial<T>
    >(localStorageKey, defaultValues);

    const form = useForm<T>({
      resolver: zodResolver(schema),
      defaultValues: defaultValues,
    });

    useEffect(() => {
      form.reset({ ...defaultValues, ...values });
      form.watch((v) => {
        setValues(v);
      });
    }, []);

  return { form, values};
}
