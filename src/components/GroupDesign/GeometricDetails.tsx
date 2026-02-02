import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { footpathOptions } from "@/data/locationData";
import ModifyAdditionalGeometry from "./ModifyAdditionalGeometry";

interface GeometricDetailsProps {
  disabled: boolean;
  carriageWayWidth: number;
  setCarriageWayWidth: (width: number) => void;
}

const GeometricDetails = ({
  disabled,
  carriageWayWidth,
  setCarriageWayWidth,
}: GeometricDetailsProps) => {
  const [span, setSpan] = useState<string>("25");
  const [footpath, setFootpath] = useState<string>("None");
  const [skewAngle, setSkewAngle] = useState<string>("0");
  const [showGeometryDialog, setShowGeometryDialog] = useState(false);

  // Validation errors
  const [spanError, setSpanError] = useState<string>("");
  const [carriageError, setCarriageError] = useState<string>("");
  const [skewError, setSkewError] = useState<string>("");

  // Geometry values from popup
  const [girderSpacing, setGirderSpacing] = useState<number>(2.5);
  const [numberOfGirders, setNumberOfGirders] = useState<number>(4);
  const [deckOverhang, setDeckOverhang] = useState<number>(1.5);

  // Validate span
  useEffect(() => {
    const spanVal = parseFloat(span);
    if (isNaN(spanVal)) {
      setSpanError("");
    } else if (spanVal < 20 || spanVal > 45) {
      setSpanError("Outside the software range. Span must be 20-45m.");
    } else {
      setSpanError("");
    }
  }, [span]);

  // Validate carriageway width
  useEffect(() => {
    if (isNaN(carriageWayWidth)) {
      setCarriageError("");
    } else if (carriageWayWidth < 4.25 || carriageWayWidth >= 24) {
      setCarriageError("Carriageway width must be ≥ 4.25m and < 24m (IRC requirement).");
    } else {
      setCarriageError("");
    }
  }, [carriageWayWidth]);

  // Validate skew angle
  useEffect(() => {
    const angleVal = parseFloat(skewAngle);
    if (isNaN(angleVal)) {
      setSkewError("");
    } else if (angleVal > 15 || angleVal < -15) {
      setSkewError("IRC 24 (2010) requires detailed analysis when skew angle exceeds ±15°.");
    } else {
      setSkewError("");
    }
  }, [skewAngle]);

  const handleGeometrySave = (spacing: number, girders: number, overhang: number) => {
    setGirderSpacing(spacing);
    setNumberOfGirders(girders);
    setDeckOverhang(overhang);
  };

  return (
    <div className="section-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="section-title mb-0">Geometric Details</h3>
        <Button
          size="sm"
          onClick={() => setShowGeometryDialog(true)}
          disabled={disabled}
          className="h-7 text-xs bg-primary hover:bg-primary/90"
        >
          Modify Additional Geometry
        </Button>
      </div>

      <div className="space-y-2">
        {/* Span */}
        <div>
          <div className="input-row">
            <label className="input-label">Span (m):</label>
            <Input
              type="number"
              value={span}
              onChange={(e) => setSpan(e.target.value)}
              disabled={disabled}
              className="w-[120px] h-8 text-sm"
              min={20}
              max={45}
              step={0.1}
            />
          </div>
          {spanError && <p className="error-message">{spanError}</p>}
        </div>

        {/* Carriageway Width */}
        <div>
          <div className="input-row">
            <label className="input-label">Carriageway Width (m):</label>
            <Input
              type="number"
              value={carriageWayWidth}
              onChange={(e) => setCarriageWayWidth(parseFloat(e.target.value) || 0)}
              disabled={disabled}
              className="w-[120px] h-8 text-sm"
              min={4.25}
              max={24}
              step={0.25}
            />
          </div>
          {carriageError && <p className="error-message">{carriageError}</p>}
        </div>

        {/* Footpath */}
        <div className="input-row">
          <label className="input-label">Footpath:</label>
          <Select value={footpath} onValueChange={setFootpath} disabled={disabled}>
            <SelectTrigger className="w-[120px] h-8 text-sm">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {footpathOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Skew Angle */}
        <div>
          <div className="input-row">
            <label className="input-label">Skew Angle (degrees):</label>
            <Input
              type="number"
              value={skewAngle}
              onChange={(e) => setSkewAngle(e.target.value)}
              disabled={disabled}
              className="w-[120px] h-8 text-sm"
              min={-15}
              max={15}
              step={1}
            />
          </div>
          {skewError && <p className="error-message">{skewError}</p>}
        </div>

        {/* Display current geometry values */}
        {(girderSpacing > 0 || numberOfGirders > 0) && (
          <div className="mt-3 pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1">Current Geometry:</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Girder Spacing: </span>
                <span className="text-success font-medium">{girderSpacing.toFixed(1)}m</span>
              </div>
              <div>
                <span className="text-muted-foreground">No. of Girders: </span>
                <span className="text-success font-medium">{numberOfGirders}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Overhang: </span>
                <span className="text-success font-medium">{deckOverhang.toFixed(1)}m</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <ModifyAdditionalGeometry
        open={showGeometryDialog}
        onOpenChange={setShowGeometryDialog}
        carriageWayWidth={carriageWayWidth}
        onSave={handleGeometrySave}
        initialSpacing={girderSpacing}
        initialGirders={numberOfGirders}
        initialOverhang={deckOverhang}
      />
    </div>
  );
};

export default GeometricDetails;
