import { Checkbox } from "@/components/ui/checkbox";

function CustomCheckbox({ label, id, selected, toggleSelected, ...props }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={selected}
        onChange={() => toggleSelected(id)}
        {...props}
      />
      <label
        htmlFor={id}
        className={`text-sm font-medium leading-none ${
          selected
            ? ""
            : "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default CustomCheckbox;
