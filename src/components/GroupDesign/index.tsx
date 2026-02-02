import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInputsTab from "./BasicInputsTab";
import BridgeCrossSection from "./BridgeCrossSection";

const GroupDesign = () => {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold rounded">
              S
            </div>
            <h1 className="text-lg font-semibold">Group Design</h1>
          </div>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <span className="cursor-pointer hover:text-foreground">File</span>
            <span className="cursor-pointer hover:text-foreground">Edit</span>
            <span className="cursor-pointer hover:text-foreground">Graphics</span>
            <span className="cursor-pointer hover:text-foreground">Help</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-49px)]">
        {/* Left Panel - Inputs */}
        <div className="w-[420px] min-w-[380px] bg-card border-r border-border overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="basic"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2"
              >
                Basic Inputs
              </TabsTrigger>
              <TabsTrigger
                value="additional"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2"
              >
                Additional Inputs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-0 p-3">
              <BasicInputsTab />
            </TabsContent>

            <TabsContent value="additional" className="mt-0 p-3">
              <div className="section-card">
                <p className="text-muted-foreground text-sm">
                  Additional inputs will be available in future updates.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Bridge Cross Section */}
        <div className="flex-1 bg-sidebar">
          <BridgeCrossSection />
        </div>
      </div>
    </div>
  );
};

export default GroupDesign;
