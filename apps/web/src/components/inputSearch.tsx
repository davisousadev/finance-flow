import { SearchIcon } from "lucide-react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

type InputSearchProps = {
    label?: string;
    description?: string;
    placeholder?: string;
    iconPosition?: "start" | "end";
};

export function InputSearch({ label, description, placeholder, iconPosition }: InputSearchProps) {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="inline-start-input">{label}</FieldLabel>
      <InputGroup className="rounded-full border border-neutral-900 bg-neutral-900 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary text-secondary-100"   >
        <InputGroupInput id="inline-start-input" placeholder={placeholder || "Search..."} />
        <InputGroupAddon align={`inline-${iconPosition || "start"}`}>
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>{description}</FieldDescription>
    </Field>
  )
}
