import * as React from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";

interface Item {
  value: string;
  label: string;
}

interface Props {
  items: Item[];
  placeHolder?: string;
  onChange?: (selectedItem: Item | undefined) => void;
}

export function Combobox(props: Props) {
  const { items = [], placeHolder = "Select Value...", onChange } = props;

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Item>();

  const handleSelectItem = (item: Item) => {
    setValue(item);
    setOpen(false);
    if (onChange) {
      onChange(item);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value.label : placeHolder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeHolder} />
          <CommandEmpty>No data found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={() => handleSelectItem(item)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value?.value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
