import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface LocationMapProps {
  address: string;
  locationName: string;
  googleMapsQuery?: string;
}

const LocationMap = ({ address, locationName, googleMapsQuery }: LocationMapProps) => {
  // Create Google Maps search URL
  const searchQuery = googleMapsQuery || `${locationName}, ${address}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
  
  // Create embed URL - using Place mode or Search mode
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&q=${encodeURIComponent(searchQuery)}&zoom=15`;

  const openInMaps = () => {
    window.open(mapsUrl, '_blank');
  };

  return (
    <Card className="luxury-card overflow-hidden">
      <div className="relative h-[300px] bg-muted/20">
        {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={embedUrl}
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <MapPin className="w-16 h-16 text-gold-accent/50" />
            <div className="space-y-2">
              <p className="text-light-beige/90 font-medium">{locationName}</p>
              <p className="text-light-beige/70 text-sm">{address}</p>
            </div>
          </div>
        )}
        
        {/* Overlay gradient at bottom for better button visibility */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-deep-blue/80 to-transparent pointer-events-none" />
      </div>
      
      <div className="p-4">
        <Button
          onClick={openInMaps}
          className="w-full bg-gold-accent hover:bg-gold-accent/90 text-deep-blue font-semibold gap-2 shadow-[0_4px_16px_-4px_hsl(42_78%_55%/0.4)] hover:shadow-[0_6px_20px_-4px_hsl(42_78%_55%/0.6)] transition-all duration-300"
        >
          <Navigation className="w-4 h-4" />
          Buka di Google Maps
        </Button>
      </div>
    </Card>
  );
};

export default LocationMap;
