import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CustomSelectBox({
  placeholder,
  selectedValue,
  handleChange,
  className,
  groupLabel,
  value1,
  value2,
  value3,
  value4,
  value5,
  value6,
  value7,
}) {
  return (
    <Select value={selectedValue} onValueChange={handleChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{groupLabel}</SelectLabel>
          <SelectItem value={value1}>{value1}</SelectItem>
          <SelectItem value={value2}>{value2}</SelectItem>
          {value3 && <SelectItem value={value3}>{value3}</SelectItem>}
          {value4 && <SelectItem value={value4}>{value4}</SelectItem>}
          {value5 && <SelectItem value={value5}>{value5}</SelectItem>}
          {value6 && <SelectItem value={value6}>{value6}</SelectItem>}
          {value7 && <SelectItem value={value7}>{value7}</SelectItem>}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CustomSelectBox;
