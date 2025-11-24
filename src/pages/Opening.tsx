import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroSatinBg from "@/assets/hero-satin-bg.jpg";
import { getWeddingInvitation, WeddingInvitation } from "@/lib/supabase";

const Opening = () => {
  const navigate = useNavigate();
  const [weddingData, setWeddingData] = useState<WeddingInvitation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeddingInvitation();
      setWeddingData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('id-ID', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="shimmer w-16 h-16 rounded-full border-4 border-gold-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroSatinBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/90 via-deep-blue/70 to-deep-blue/90" />
      
      {/* Spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold-accent/10 rounded-full blur-[120px] animate-pulse" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-12 max-w-4xl mx-auto fade-in">
        <div className="space-y-8">
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold-accent" />
            <div className="w-2 h-2 rounded-full bg-gold-accent shimmer" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold-accent" />
          </div>

          {/* Names */}
          <div className="space-y-6">
            <h1 className="script-text text-6xl md:text-8xl text-gold-accent animate-fade-in">
              {weddingData?.bride_name}
            </h1>
            <div className="text-4xl md:text-5xl text-foreground font-light">&</div>
            <h1 className="script-text text-6xl md:text-8xl text-gold-accent animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {weddingData?.groom_name}
            </h1>
          </div>

          {/* Date */}
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-sky-blue text-xl md:text-2xl font-light tracking-wider">
              {weddingData?.wedding_date ? formatDate(weddingData.wedding_date) : ''}
            </p>
          </div>

          {/* Message */}
          <p className="text-light-beige/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {weddingData?.opening_message}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 py-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-accent" />
            <div className="w-3 h-3 rotate-45 border border-gold-accent" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-accent" />
          </div>

          {/* Button */}
          <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
            <Button
              onClick={() => navigate('/invitation')}
              size="lg"
              className="bg-gold-accent hover:bg-gold-accent/90 text-deep-blue font-semibold px-12 py-6 text-lg rounded-full shadow-[0_8px_32px_-8px_hsl(42_78%_55%/0.4)] hover:shadow-[0_12px_40px_-8px_hsl(42_78%_55%/0.6)] transition-all duration-300 hover:scale-105"
            >
              Buka Undangan
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-blue to-transparent" />
    </div>
  );
};

export default Opening;
