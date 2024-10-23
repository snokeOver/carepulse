import { Control } from "react-hook-form";
import { FormFieldTypes } from "./enums";

export interface CustomFormFieldProps {
  control: Control<any>;
  inputType: FormFieldTypes;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

export interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}
