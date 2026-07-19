import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  FieldError,
  FieldValues,
  get,
  Path,
  useFormContext,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  label?: string;
  message?: string;
  name: Path<T>;
  type?: "text" | "number";
  placeholder?: string;
};

const InputComponent = <T extends FieldValues>({
  label,
  message,
  name,
  type = "text",
  placeholder,
}: Props<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = get(errors, name) as FieldError | undefined;

  return (
    <Field>
      {label && <FieldLabel>{label}</FieldLabel>}
      <Input
        type={type}
        {...register(name, {
          setValueAs(value) {
            if (type === "number") {
              return value == "" ? undefined : Number(value);
            }
            return value;
          },
        })}
        placeholder={placeholder}
      />
      {error ? (
        <FieldDescription className="text-xs text-destructive">
          {error.message}
        </FieldDescription>
      ) : (
        message && <FieldDescription>{message}</FieldDescription>
      )}
    </Field>
  );
};

export default InputComponent;
