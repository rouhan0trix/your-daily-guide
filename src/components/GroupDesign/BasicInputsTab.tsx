import { useState, useEffect } from "react";
import TypeOfStructure from "./TypeOfStructure";
import ProjectLocation from "./ProjectLocation";
import GeometricDetails from "./GeometricDetails";
import MaterialInputs from "./MaterialInputs";

export interface LoadingParams {
  basicWindSpeed: number | null;
  seismicZone: string;
  zoneFactor: number | null;
  maxTemperature: number | null;
  minTemperature: number | null;
}

const BasicInputsTab = () => {
  const [structureType, setStructureType] = useState<string>("Highway");
  const [isDisabled, setIsDisabled] = useState(false);
  const [carriageWayWidth, setCarriageWayWidth] = useState<number>(12);
  
  const [loadingParams, setLoadingParams] = useState<LoadingParams>({
    basicWindSpeed: null,
    seismicZone: "",
    zoneFactor: null,
    maxTemperature: null,
    minTemperature: null,
  });

  useEffect(() => {
    setIsDisabled(structureType === "Other");
  }, [structureType]);

  return (
    <div className="space-y-3">
      <TypeOfStructure 
        value={structureType} 
        onChange={setStructureType} 
      />
      
      <ProjectLocation 
        disabled={isDisabled} 
        loadingParams={loadingParams}
        setLoadingParams={setLoadingParams}
      />
      
      <GeometricDetails 
        disabled={isDisabled} 
        carriageWayWidth={carriageWayWidth}
        setCarriageWayWidth={setCarriageWayWidth}
      />
      
      <MaterialInputs disabled={isDisabled} />
    </div>
  );
};

export default BasicInputsTab;
