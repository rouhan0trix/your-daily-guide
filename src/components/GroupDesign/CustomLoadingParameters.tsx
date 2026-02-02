import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LoadingParams } from "./BasicInputsTab";

interface CustomLoadingParametersProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (params: LoadingParams) => void;
}

const seismicZones = [
  { zone: "II", factor: 0.10 },
  { zone: "III", factor: 0.16 },
  { zone: "IV", factor: 0.24 },
  { zone: "V", factor: 0.36 },
];

const CustomLoadingParameters = ({
  open,
  onOpenChange,
  onSave,
}: CustomLoadingParametersProps) => {
  const [windSpeed, setWindSpeed] = useState<string>("");
  const [seismicZone, setSeismicZone] = useState<string>("");
  const [maxTemp, setMaxTemp] = useState<string>("");
  const [minTemp, setMinTemp] = useState<string>("");

  const handleSave = () => {
    const selectedZone = seismicZones.find((z) => z.zone === seismicZone);
    onSave({
      basicWindSpeed: windSpeed ? parseFloat(windSpeed) : null,
      seismicZone: seismicZone,
      zoneFactor: selectedZone?.factor || null,
      maxTemperature: maxTemp ? parseFloat(maxTemp) : null,
      minTemperature: minTemp ? parseFloat(minTemp) : null,
    });
    onOpenChange(false);
  };

  const handleReset = () => {
    setWindSpeed("");
    setSeismicZone("");
    setMaxTemp("");
    setMinTemp("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Custom Loading Parameters</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="windSpeed" className="text-right text-sm">
              Basic Wind Speed (m/s)
            </Label>
            <Input
              id="windSpeed"
              type="number"
              value={windSpeed}
              onChange={(e) => setWindSpeed(e.target.value)}
              className="col-span-3 h-8"
              placeholder="e.g., 47"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="seismicZone" className="text-right text-sm">
              Seismic Zone
            </Label>
            <Select value={seismicZone} onValueChange={setSeismicZone}>
              <SelectTrigger className="col-span-3 h-8">
                <SelectValue placeholder="Select Zone" />
              </SelectTrigger>
              <SelectContent>
                {seismicZones.map((z) => (
                  <SelectItem key={z.zone} value={z.zone}>
                    Zone {z.zone} (Z = {z.factor})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="maxTemp" className="text-right text-sm">
              Max Temperature (°C)
            </Label>
            <Input
              id="maxTemp"
              type="number"
              value={maxTemp}
              onChange={(e) => setMaxTemp(e.target.value)}
              className="col-span-3 h-8"
              placeholder="e.g., 45"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minTemp" className="text-right text-sm">
              Min Temperature (°C)
            </Label>
            <Input
              id="minTemp"
              type="number"
              value={minTemp}
              onChange={(e) => setMinTemp(e.target.value)}
              className="col-span-3 h-8"
              placeholder="e.g., 5"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSave}>Save Parameters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomLoadingParameters;
