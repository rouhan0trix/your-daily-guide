import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getUniqueStates,
  getDistrictsByState,
  getCityData,
} from "@/data/locationData";
import CustomLoadingParameters from "./CustomLoadingParameters";
import type { LoadingParams } from "./BasicInputsTab";

interface ProjectLocationProps {
  disabled: boolean;
  loadingParams: LoadingParams;
  setLoadingParams: (params: LoadingParams) => void;
}

const ProjectLocation = ({
  disabled,
  loadingParams,
  setLoadingParams,
}: ProjectLocationProps) => {
  const [locationMode, setLocationMode] = useState<"name" | "custom">("name");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [showCustomDialog, setShowCustomDialog] = useState(false);

  const states = getUniqueStates();
  const districts = selectedState ? getDistrictsByState(selectedState) : [];

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedDistrict("");
    setLoadingParams({
      basicWindSpeed: null,
      seismicZone: "",
      zoneFactor: null,
      maxTemperature: null,
      minTemperature: null,
    });
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    const cityData = getCityData(selectedState, district);
    if (cityData) {
      setLoadingParams({
        basicWindSpeed: cityData.basicWindSpeed,
        seismicZone: cityData.seismicZone,
        zoneFactor: cityData.zoneFactor,
        maxTemperature: cityData.maxTemperature,
        minTemperature: cityData.minTemperature,
      });
    }
  };

  const handleModeChange = (mode: "name" | "custom") => {
    setLocationMode(mode);
    if (mode === "name") {
      setSelectedState("");
      setSelectedDistrict("");
    }
    setLoadingParams({
      basicWindSpeed: null,
      seismicZone: "",
      zoneFactor: null,
      maxTemperature: null,
      minTemperature: null,
    });
  };

  return (
    <div className="section-card bg-primary">
      <h3 className="section-title text-primary-foreground">Project Location</h3>

      {/* Mode Selection */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="locationName"
            checked={locationMode === "name"}
            onCheckedChange={() => handleModeChange("name")}
            disabled={disabled}
            className="border-primary-foreground data-[state=checked]:bg-accent"
          />
          <label
            htmlFor="locationName"
            className="text-sm text-primary-foreground cursor-pointer"
          >
            Enter Location Name
          </label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="customParams"
            checked={locationMode === "custom"}
            onCheckedChange={() => handleModeChange("custom")}
            disabled={disabled}
            className="border-primary-foreground data-[state=checked]:bg-accent"
          />
          <label
            htmlFor="customParams"
            className="text-sm text-primary-foreground cursor-pointer"
          >
            Tabulate Custom Loading Parameters
          </label>
          {locationMode === "custom" && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setShowCustomDialog(true)}
              disabled={disabled}
              className="ml-2 h-6 text-xs"
            >
              Open
            </Button>
          )}
        </div>
      </div>

      {/* Location Dropdowns (for "name" mode) */}
      {locationMode === "name" && (
        <div className="space-y-2 mb-3 bg-card p-2 rounded">
          <div className="input-row">
            <label className="input-label">State</label>
            <Select
              value={selectedState}
              onValueChange={handleStateChange}
              disabled={disabled}
            >
              <SelectTrigger className="w-[160px] h-8 text-sm">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="input-row">
            <label className="input-label">District</label>
            <Select
              value={selectedDistrict}
              onValueChange={handleDistrictChange}
              disabled={disabled || !selectedState}
            >
              <SelectTrigger className="w-[160px] h-8 text-sm">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Resulting Values - IRC 6 (2017) */}
      {(loadingParams.basicWindSpeed !== null ||
        loadingParams.seismicZone ||
        loadingParams.maxTemperature !== null) && (
        <div className="bg-card p-2 rounded">
          <p className="text-xs font-semibold mb-2 text-muted-foreground">
            IRC 6 (2017) Resulting Values:
          </p>
          <div className="grid grid-cols-1 gap-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Basic Wind Speed:</span>
              <span className="text-success font-medium">
                {loadingParams.basicWindSpeed} m/s
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Seismic Zone:</span>
              <span className="text-success font-medium">
                Zone {loadingParams.seismicZone} (Z = {loadingParams.zoneFactor})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shade Air Temp:</span>
              <span className="text-success font-medium">
                {loadingParams.minTemperature}°C to {loadingParams.maxTemperature}°C
              </span>
            </div>
          </div>
        </div>
      )}

      <CustomLoadingParameters
        open={showCustomDialog}
        onOpenChange={setShowCustomDialog}
        onSave={setLoadingParams}
      />
    </div>
  );
};

export default ProjectLocation;
