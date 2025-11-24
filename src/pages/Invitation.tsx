import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Shirt, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import cloudyBlueBg from "@/assets/cloudy-blue-bg.jpg";
import elegantTable from "@/assets/elegant-table.jpg";
import heroSatinBg from "@/assets/hero-satin-bg.jpg";
import { getWeddingInvitation, submitRSVP, WeddingInvitation } from "@/lib/supabase";

const Invitation = () => {
  const { toast } = useToast();
  const [weddingData, setWeddingData] = useState<WeddingInvitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    guest_name: "",
    guest_count: 1,
    attendance_status: "hadir" as "hadir" | "tidak_hadir" | "ragu",
    message: "",
    phone_number: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeddingInvitation();
      setWeddingData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmitRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitRSVP(formData);
      toast({
        title: "Terima kasih!",
        description: "RSVP Anda telah berhasil dikirim.",
      });
      setFormData({
        guest_name: "",
        guest_count: 1,
        attendance_status: "hadir",
        message: "",
        phone_number: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengirim RSVP. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="shimmer w-16 h-16 rounded-full border-4 border-gold-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Names */}
      <section 
        className="relative min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroSatinBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/80 to-deep-blue/90" />
        <div className="relative z-10 text-center px-6 fade-in">
          <h1 className="script-text text-5xl md:text-7xl text-gold-accent mb-4">
            {weddingData?.bride_name} & {weddingData?.groom_name}
          </h1>
          <div className="h-px w-32 bg-gold-accent mx-auto" />
        </div>
      </section>

      {/* Story Section */}
      <section 
        className="relative py-20 px-6"
        style={{
          backgroundImage: `url(${cloudyBlueBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-cloudy-blue/90" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="luxury-card p-8 md:p-12 text-center space-y-6 fade-in">
            <h2 className="text-3xl md:text-4xl font-serif text-gold-accent">{weddingData?.story_title}</h2>
            <div className="h-px w-24 bg-gold-accent mx-auto" />
            <p className="text-light-beige/90 leading-relaxed text-lg">
              {weddingData?.story_content}
            </p>
          </div>
        </div>
      </section>

      {/* Event Information */}
      <section className="py-20 px-6 bg-deep-blue">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-gold-accent text-center mb-12 fade-in">
            Detail Acara
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Akad */}
            <Card className="luxury-card p-8 space-y-6 fade-in">
              <h3 className="text-2xl font-serif text-gold-accent text-center">Akad Nikah</h3>
              <div className="space-y-4 text-light-beige/90">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-gold-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Tanggal</p>
                    <p>{weddingData?.event_date_akad}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-gold-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Waktu</p>
                    <p>{weddingData?.event_time_akad}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-gold-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Lokasi</p>
                    <p>{weddingData?.event_location_akad}</p>
                    <p className="text-sm text-light-beige/70">{weddingData?.event_address_akad}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Resepsi */}
            <Card className="luxury-card p-8 space-y-6 fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-serif text-gold-accent text-center">Resepsi</h3>
              <div className="space-y-4 text-light-beige/90">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-gold-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Tanggal</p>
                    <p>{weddingData?.event_date_resepsi}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-gold-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Waktu</p>
                    <p>{weddingData?.event_time_resepsi}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-gold-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Lokasi</p>
                    <p>{weddingData?.event_location_resepsi}</p>
                    <p className="text-sm text-light-beige/70">{weddingData?.event_address_resepsi}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Dress Code */}
      <section 
        className="relative py-20 px-6"
        style={{
          backgroundImage: `url(${cloudyBlueBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-cloudy-blue/90" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Card className="luxury-card p-8 md:p-12 text-center space-y-8 fade-in">
            <div className="flex justify-center">
              <Shirt className="w-16 h-16 text-gold-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-gold-accent">{weddingData?.dress_code_title}</h2>
            <p className="text-light-beige/90 text-lg">{weddingData?.dress_code_description}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {weddingData?.dress_code_colors?.map((color, index) => (
                <div 
                  key={index}
                  className="px-6 py-3 rounded-full bg-muted/30 border border-gold-accent/30 text-light-beige"
                >
                  {color}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-20 px-6 bg-deep-blue">
        <div className="max-w-2xl mx-auto">
          <Card className="luxury-card p-8 md:p-12 space-y-8 fade-in">
            <div className="text-center space-y-4">
              <MessageCircle className="w-16 h-16 text-gold-accent mx-auto" />
              <h2 className="text-3xl md:text-4xl font-serif text-gold-accent">Konfirmasi Kehadiran</h2>
              <p className="text-light-beige/80">Mohon konfirmasi kehadiran Anda</p>
            </div>

            <form onSubmit={handleSubmitRSVP} className="space-y-6">
              <div className="space-y-2">
                <label className="text-light-beige/90 font-medium">Nama Lengkap</label>
                <Input
                  value={formData.guest_name}
                  onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                  placeholder="Masukkan nama Anda"
                  required
                  className="bg-muted/30 border-gold-accent/30 text-light-beige placeholder:text-light-beige/40"
                />
              </div>

              <div className="space-y-2">
                <label className="text-light-beige/90 font-medium">Nomor Telepon (WhatsApp)</label>
                <Input
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  placeholder="08XX XXXX XXXX"
                  className="bg-muted/30 border-gold-accent/30 text-light-beige placeholder:text-light-beige/40"
                />
              </div>

              <div className="space-y-2">
                <label className="text-light-beige/90 font-medium">Jumlah Tamu</label>
                <Input
                  type="number"
                  min="1"
                  value={formData.guest_count}
                  onChange={(e) => setFormData({ ...formData, guest_count: parseInt(e.target.value) })}
                  className="bg-muted/30 border-gold-accent/30 text-light-beige"
                />
              </div>

              <div className="space-y-2">
                <label className="text-light-beige/90 font-medium">Konfirmasi Kehadiran</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'hadir', label: 'Hadir' },
                    { value: 'tidak_hadir', label: 'Tidak Hadir' },
                    { value: 'ragu', label: 'Ragu-ragu' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance_status: option.value as any })}
                      className={`py-3 px-4 rounded-lg border transition-all ${
                        formData.attendance_status === option.value
                          ? 'bg-gold-accent text-deep-blue border-gold-accent'
                          : 'bg-muted/30 text-light-beige border-gold-accent/30 hover:border-gold-accent/50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-light-beige/90 font-medium">Ucapan & Doa</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tuliskan ucapan dan doa untuk kami..."
                  rows={4}
                  className="bg-muted/30 border-gold-accent/30 text-light-beige placeholder:text-light-beige/40 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gold-accent hover:bg-gold-accent/90 text-deep-blue font-semibold py-6 text-lg rounded-xl shadow-[0_8px_32px_-8px_hsl(42_78%_55%/0.4)] hover:shadow-[0_12px_40px_-8px_hsl(42_78%_55%/0.6)] transition-all duration-300"
              >
                Kirim Konfirmasi
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Closing Section */}
      <section 
        className="relative py-20 px-6"
        style={{
          backgroundImage: `url(${elegantTable})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-deep-blue/85" />
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8 fade-in">
          <h2 className="script-text text-4xl md:text-5xl text-gold-accent">Terima Kasih</h2>
          <div className="h-px w-32 bg-gold-accent mx-auto" />
          <p className="text-light-beige/90 text-lg md:text-xl leading-relaxed">
            {weddingData?.closing_message}
          </p>
          <div className="pt-8">
            <p className="text-gold-accent text-2xl font-serif">
              {weddingData?.bride_name} & {weddingData?.groom_name}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Invitation;
