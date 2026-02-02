import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { girderGrades, crossBracingGrades, deckConcreteGrades } from "@/data/locationData";
import { useState } from "react";

interface MaterialInputsProps {
  disabled: boolean;
}

const MaterialInputs = ({ disabled }: MaterialInputsProps) => {
  const [girderGrade, setGirderGrade] = useState<string>("E350");
  const [crossBracingGrade, setCrossBracingGrade] = useState<string>("E350");
  const [deckGrade, setDeckGrade] = useState<string>("M35");

  return (
    <div className="section-card">
      <h3 className="section-title">Material Inputs</h3>

      <div className="space-y-2">
     
        <div className="input-row">
          <label className="input-label">Girder</label>
          <Select
            value={girderGrade}
            onValueChange={setGirderGrade}
            disabled={disabled}
          >
            <SelectTrigger className="w-[120px] h-8 text-sm">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              {girderGrades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="input-row">
          <label className="input-label">Cross Bracing</label>
          <Select
            value={crossBracingGrade}
            onValueChange={setCrossBracingGrade}
            disabled={disabled}
          >
            <SelectTrigger className="w-[120px] h-8 text-sm">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              {crossBracingGrades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

  
        <div className="input-row">
          <label className="input-label">Deck</label>
          <Select
            value={deckGrade}
            onValueChange={setDeckGrade}
            disabled={disabled}
          >
            <SelectTrigger className="w-[120px] h-8 text-sm">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              {deckConcreteGrades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default MaterialInputs;
