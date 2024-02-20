import { Textarea } from "@/components/ui/textarea";

function CustomTextArea({ placeholder, ...props }) {
  return <Textarea placeholder={placeholder} {...props} />;
}

export default CustomTextArea;
