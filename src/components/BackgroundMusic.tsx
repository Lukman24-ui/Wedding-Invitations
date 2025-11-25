import { useState, useRef, useEffect } from "react";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface BackgroundMusicProps {
  audioSrc?: string;
}

const BackgroundMusic = ({ audioSrc = "/wedding-music.mp3" }: BackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      if (newVolume === 0) {
        setIsMuted(true);
        audioRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Extended Controls */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          showControls
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="luxury-card p-4 space-y-3 min-w-[200px]">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleMute}
              className="h-8 w-8 text-gold-accent hover:text-gold-accent/80 hover:bg-gold-accent/10"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>
          <div className="text-xs text-light-beige/60 text-center">
            Background Music
          </div>
        </div>
      </div>

      {/* Main Control Button */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gold-accent/20 rounded-full blur-xl group-hover:bg-gold-accent/30 transition-all duration-300" />
        <Button
          size="icon"
          onClick={togglePlay}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          className="relative h-14 w-14 rounded-full bg-gradient-to-br from-gold-accent to-gold-accent/80 hover:from-gold-accent/90 hover:to-gold-accent/70 text-deep-blue shadow-[0_8px_32px_-8px_hsl(42_78%_55%/0.6)] hover:shadow-[0_12px_40px_-8px_hsl(42_78%_55%/0.8)] transition-all duration-300"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6 fill-current" />
          ) : (
            <Play className="h-6 w-6 fill-current ml-0.5" />
          )}
          
          {/* Music Icon Indicator */}
          <Music
            className={`absolute -top-1 -right-1 h-4 w-4 text-gold-accent bg-deep-blue rounded-full p-0.5 transition-all duration-300 ${
              isPlaying ? "animate-pulse" : "opacity-50"
            }`}
          />
        </Button>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default BackgroundMusic;
