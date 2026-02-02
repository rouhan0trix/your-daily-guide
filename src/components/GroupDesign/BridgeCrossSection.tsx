const BridgeCrossSection = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-accent text-accent-foreground px-4 py-2 text-center">
        <h2 className="text-sm font-semibold">
          BRIDGE CROSS SECTION (For Nomenclature only)
        </h2>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-card rounded-lg p-6 shadow-lg max-w-3xl w-full">
          {/* Bridge Cross Section SVG */}
          <svg
            viewBox="0 0 600 350"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            
            <rect width="600" height="350" fill="white" />

            
            <rect x="50" y="80" width="500" height="25" fill="#e5e5e5" stroke="#333" strokeWidth="1.5" />
            
            
            <g fill="#999">
              <circle cx="80" cy="90" r="3" />
              <circle cx="120" cy="95" r="2" />
              <circle cx="160" cy="88" r="3" />
              <circle cx="200" cy="93" r="2" />
              <circle cx="300" cy="90" r="3" />
              <circle cx="400" cy="95" r="2" />
              <circle cx="450" cy="88" r="3" />
              <circle cx="500" cy="93" r="2" />
              <circle cx="520" cy="90" r="3" />
            </g>

            
            <rect x="50" y="60" width="60" height="20" fill="#f5f5f5" stroke="#333" strokeWidth="1" />
            <rect x="55" y="65" width="50" height="10" fill="#ddd" stroke="none" />

            
            <rect x="490" y="60" width="60" height="20" fill="#f5f5f5" stroke="#333" strokeWidth="1" />
            <rect x="495" y="65" width="50" height="10" fill="#ddd" stroke="none" />

            
            <rect x="100" y="105" width="20" height="60" fill="#333" />
            <rect x="220" y="105" width="20" height="60" fill="#333" />
            <rect x="340" y="105" width="20" height="60" fill="#333" />
            <rect x="460" y="105" width="20" height="60" fill="#333" />

           
            <g stroke="#333" strokeWidth="2" fill="none">
              
              <line x1="120" y1="115" x2="220" y2="155" />
              <line x1="120" y1="155" x2="220" y2="115" />
              
              <line x1="240" y1="115" x2="340" y2="155" />
              <line x1="240" y1="155" x2="340" y2="115" />
              
              
              <line x1="360" y1="115" x2="460" y2="155" />
              <line x1="360" y1="155" x2="460" y2="115" />
            </g>

        
            <line x1="100" y1="165" x2="480" y2="165" stroke="#333" strokeWidth="2" />

            
            <g stroke="#2563eb" strokeWidth="1" fill="#2563eb" fontSize="11" fontFamily="Arial">
            
              <line x1="80" y1="45" x2="80" y2="55" />
              <line x1="50" y1="50" x2="110" y2="50" />
              <line x1="50" y1="45" x2="50" y2="55" />
              <line x1="110" y1="45" x2="110" y2="55" />
              <text x="65" y="42" textAnchor="middle">Footpath</text>

              {/* Carriageway Width */}
              <line x1="110" y1="45" x2="110" y2="55" />
              <line x1="110" y1="50" x2="490" y2="50" />
              <line x1="490" y1="45" x2="490" y2="55" />
              <text x="300" y="42" textAnchor="middle">Carriageway Width</text>

            
              <text x="520" y="42" textAnchor="middle">Footpath</text>

              
              <line x1="50" y1="200" x2="50" y2="210" />
              <line x1="50" y1="205" x2="110" y2="205" />
              <line x1="110" y1="200" x2="110" y2="210" />
              <text x="80" y="225" textAnchor="middle" fill="#2563eb">Overhang</text>
              <text x="80" y="238" textAnchor="middle" fill="#2563eb">Width</text>

              
              <line x1="110" y1="200" x2="110" y2="210" />
              <line x1="110" y1="205" x2="470" y2="205" />
              <line x1="470" y1="200" x2="470" y2="210" />
              <text x="290" y="225" textAnchor="middle" fill="#2563eb">"N" Girders Spaced at Distance "S"</text>
              <text x="290" y="240" textAnchor="middle" fill="#2563eb" fontSize="10">(4 girders shown for clarity)</text>

            
              <line x1="470" y1="200" x2="470" y2="210" />
              <line x1="470" y1="205" x2="550" y2="205" />
              <line x1="550" y1="200" x2="550" y2="210" />
              <text x="510" y="225" textAnchor="middle" fill="#2563eb">Overhang</text>
              <text x="510" y="238" textAnchor="middle" fill="#2563eb">Width</text>
            </g>

            
            <g>
              <rect x="200" y="270" width="200" height="30" fill="#fffbeb" stroke="#fbbf24" strokeWidth="1" rx="4" />
              <text x="300" y="290" textAnchor="middle" fill="#92400e" fontSize="13" fontFamily="Arial">
                Cross-Section of Bridge
              </text>
            </g>
          </svg>
        </div>
      </div>

      
      <div className="absolute bottom-4 right-4">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <line x1="30" y1="30" x2="30" y2="10" stroke="#ef4444" strokeWidth="2" />
          <line x1="30" y1="30" x2="50" y2="40" stroke="#22c55e" strokeWidth="2" />
          <line x1="30" y1="30" x2="10" y2="40" stroke="#3b82f6" strokeWidth="2" />
          <text x="30" y="8" textAnchor="middle" fontSize="8" fill="#ef4444">Y</text>
          <text x="54" y="44" fontSize="8" fill="#22c55e">X</text>
          <text x="6" y="44" fontSize="8" fill="#3b82f6">Z</text>
        </svg>
      </div>
    </div>
  );
};

export default BridgeCrossSection;
