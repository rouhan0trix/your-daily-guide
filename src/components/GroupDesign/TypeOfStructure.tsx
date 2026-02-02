import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { structureTypes } from "@/data/locationData";

interface TypeOfStructureProps {
  value: string;
  onChange: (value: string) => void;
}

const TypeOfStructure = ({ value, onChange }: TypeOfStructureProps) => {
  return (
    <div className="section-card">
      <h3 className="section-title">Type of Structure</h3>
      
      <div className="input-row">
        <label className="input-label">Structure Type</label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-[140px] h-8 text-sm">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {structureTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {value === "Other" && (
        <p className="error-message font-medium">
          Other structures not included.
        </p>
      )}
    </div>
  );
};

export default TypeOfStructure;
