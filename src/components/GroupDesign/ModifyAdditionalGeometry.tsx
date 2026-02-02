import { useState, useEffect, useCallback } from "react";
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

interface ModifyAdditionalGeometryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  carriageWayWidth: number;
  onSave: (spacing: number, girders: number, overhang: number) => void;
  initialSpacing: number;
  initialGirders: number;
  initialOverhang: number;
}

const ModifyAdditionalGeometry = ({
  open,
  onOpenChange,
  carriageWayWidth,
  onSave,
  initialSpacing,
  initialGirders,
  initialOverhang,
}: ModifyAdditionalGeometryProps) => {
  const [girderSpacing, setGirderSpacing] = useState<string>(initialSpacing.toFixed(1));
  const [numberOfGirders, setNumberOfGirders] = useState<string>(initialGirders.toString());
  const [deckOverhang, setDeckOverhang] = useState<string>(initialOverhang.toFixed(1));
  const [error, setError] = useState<string>("");
  const [lastChanged, setLastChanged] = useState<"spacing" | "girders" | "overhang" | null>(null);

  // Overall Bridge Width = Carriageway Width + 5 meters
  const overallBridgeWidth = carriageWayWidth + 5;

  // Formula: (Overall Bridge Width - 2 * Deck Overhang) / (No. of Girders - 1) = Girder Spacing
  // Or simplified: (Overall Bridge Width - Deck Overhang) / Girder Spacing = No. of Girders

  const validateAndCalculate = useCallback(() => {
    const spacing = parseFloat(girderSpacing) || 0;
    const girders = parseInt(numberOfGirders) || 0;
    const overhang = parseFloat(deckOverhang) || 0;

    // Validation
    if (overhang * 2 >= overallBridgeWidth) {
      setError("Deck overhang is too large for the bridge width.");
      return;
    }

    if (spacing <= 0 || girders <= 0 || overhang <= 0) {
      setError("All values must be positive.");
      return;
    }

    if (girders < 2) {
      setError("Number of girders must be at least 2.");
      return;
    }

    // Check if values are consistent
    // Formula: (Overall Bridge Width - 2 * Deck Overhang) = (No. of Girders - 1) * Girder Spacing
    const calculatedWidth = (girders - 1) * spacing + 2 * overhang;
    const tolerance = 0.5;

    if (Math.abs(calculatedWidth - overallBridgeWidth) > tolerance) {
      setError(
        `Values don't satisfy the geometry constraint. Expected overall width: ${overallBridgeWidth.toFixed(1)}m, Calculated: ${calculatedWidth.toFixed(1)}m`
      );
    } else {
      setError("");
    }
  }, [girderSpacing, numberOfGirders, deckOverhang, overallBridgeWidth]);

  useEffect(() => {
    if (open) {
      setGirderSpacing(initialSpacing.toFixed(1));
      setNumberOfGirders(initialGirders.toString());
      setDeckOverhang(initialOverhang.toFixed(1));
      setError("");
      setLastChanged(null);
    }
  }, [open, initialSpacing, initialGirders, initialOverhang]);

  useEffect(() => {
    if (!open) return;
    validateAndCalculate();
  }, [girderSpacing, numberOfGirders, deckOverhang, open, validateAndCalculate]);

  // Auto-adjust when one value changes
  const handleSpacingChange = (value: string) => {
    setGirderSpacing(value);
    setLastChanged("spacing");
    
    const spacing = parseFloat(value) || 0;
    const overhang = parseFloat(deckOverhang) || 0;
    
    if (spacing > 0 && overhang > 0) {
      // Calculate number of girders
      const availableWidth = overallBridgeWidth - 2 * overhang;
      const calculatedGirders = Math.round(availableWidth / spacing) + 1;
      if (calculatedGirders >= 2) {
        setNumberOfGirders(calculatedGirders.toString());
      }
    }
  };

  const handleGirdersChange = (value: string) => {
    setNumberOfGirders(value);
    setLastChanged("girders");
    
    const girders = parseInt(value) || 0;
    const overhang = parseFloat(deckOverhang) || 0;
    
    if (girders >= 2 && overhang > 0) {
      // Calculate girder spacing
      const availableWidth = overallBridgeWidth - 2 * overhang;
      const calculatedSpacing = availableWidth / (girders - 1);
      if (calculatedSpacing > 0) {
        setGirderSpacing(calculatedSpacing.toFixed(1));
      }
    }
  };

  const handleOverhangChange = (value: string) => {
    setDeckOverhang(value);
    setLastChanged("overhang");
    
    const spacing = parseFloat(girderSpacing) || 0;
    const overhang = parseFloat(value) || 0;
    
    if (spacing > 0 && overhang > 0 && overhang * 2 < overallBridgeWidth) {
      // Calculate number of girders
      const availableWidth = overallBridgeWidth - 2 * overhang;
      const calculatedGirders = Math.round(availableWidth / spacing) + 1;
      if (calculatedGirders >= 2) {
        setNumberOfGirders(calculatedGirders.toString());
      }
    }
  };

  const handleSave = () => {
    if (!error) {
      onSave(
        parseFloat(girderSpacing) || 0,
        parseInt(numberOfGirders) || 0,
        parseFloat(deckOverhang) || 0
      );
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Modify Additional Geometry</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-muted p-3 rounded mb-4">
            <p className="text-sm font-medium">
              Overall Bridge Width = Carriageway Width + 5m ={" "}
              <span className="text-success">{overallBridgeWidth.toFixed(1)}m</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Formula: (Overall Width - 2 × Overhang) = (Girders - 1) × Spacing
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="girderSpacing" className="text-sm">
                Girder Spacing (m):
              </Label>
              <Input
                id="girderSpacing"
                type="number"
                value={girderSpacing}
                onChange={(e) => handleSpacingChange(e.target.value)}
                className="h-8"
                step={0.1}
                min={0.1}
              />
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="numberOfGirders" className="text-sm">
                No. of Girders:
              </Label>
              <Input
                id="numberOfGirders"
                type="number"
                value={numberOfGirders}
                onChange={(e) => handleGirdersChange(e.target.value)}
                className="h-8"
                step={1}
                min={2}
              />
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="deckOverhang" className="text-sm">
                Deck Overhang Width (m):
              </Label>
              <Input
                id="deckOverhang"
                type="number"
                value={deckOverhang}
                onChange={(e) => handleOverhangChange(e.target.value)}
                className="h-8"
                step={0.1}
                min={0.1}
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-2 bg-destructive/10 border border-destructive/20 rounded">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {!error && lastChanged && (
            <div className="mt-4 p-2 bg-success/10 border border-success/20 rounded">
              <p className="text-success text-sm">✓ Geometry values are valid and consistent.</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!!error}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyAdditionalGeometry;
