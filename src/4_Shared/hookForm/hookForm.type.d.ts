type UseFormClearErrors<TFieldValues extends FieldValues> = (
  name?:
    | FieldPath<TFieldValues>
    | FieldPath<TFieldValues>[]
    | readonly FieldPath<TFieldValues>[]
    | `root.${string}`
    | "root"
) => void;

type UseFormSetValue<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  name: TFieldName,
  value: FieldPathValue<TFieldValues, TFieldName>,
  options?: SetValueConfig
) => void;

type FieldValues = Record<string, unknown>;

type UseFormGetValues<TFieldValues extends FieldValues> = {
  (): TFieldValues;

  <TFieldName extends FieldPath<TFieldValues>>(
    name: TFieldName
  ): FieldPathValue<TFieldValues, TFieldName>;

  <TFieldNames extends FieldPath<TFieldValues>[]>(
    names: readonly [...TFieldNames]
  ): [...FieldPathValues<TFieldValues, TFieldNames>];
};
