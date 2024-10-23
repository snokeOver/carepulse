import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldTypes } from "@/interfaces/enums";
import { CustomFormFieldProps } from "@/interfaces/interface";
import Image from "next/image";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps;
}) => {
  const { inputType, iconSrc, iconAlt, placeholder } = props;

  switch (inputType) {
    case FormFieldTypes.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              width={24}
              height={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldTypes.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            onChange={field.onChange}
            international
            withCountryCallingCode
            value={field.value as E16Number | undefined}
            className="input-phone"
          />
        </FormControl>
      );

    default:
      break;
  }
};

const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, inputType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {inputType !== FormFieldTypes.CHECKBOX && label && (
            <FormLabel> {label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
          <FormMessage className="shad-eror" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
