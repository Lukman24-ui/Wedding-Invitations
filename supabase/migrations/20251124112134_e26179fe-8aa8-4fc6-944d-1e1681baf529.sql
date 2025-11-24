-- Add story_text field to wedding_gallery for longer storytelling content
ALTER TABLE wedding_gallery 
ADD COLUMN IF NOT EXISTS story_text TEXT;

-- Add some sample gallery data with storytelling
INSERT INTO wedding_gallery (wedding_id, image_url, caption, story_text, section, display_order)
SELECT 
  id,
  'gallery-1.jpg',
  'Pertemuan Pertama',
  'Takdir mempertemukan kami di sebuah kafe kecil yang hangat. Tatapan pertama yang tidak sengaja berubah menjadi percakapan panjang yang tidak ingin berakhir. Sejak saat itu, kami tahu ada sesuatu yang istimewa.',
  'story',
  1
FROM wedding_invitation
LIMIT 1;

INSERT INTO wedding_gallery (wedding_id, image_url, caption, story_text, section, display_order)
SELECT 
  id,
  'gallery-2.jpg',
  'Momen Lamaran',
  'Di bawah langit malam yang penuh bintang, dengan hati yang berdebar, pertanyaan paling penting dalam hidup kami diajukan. Dan jawaban "Ya" yang membawa air mata bahagia, menandai awal dari perjalanan baru kami bersama.',
  'story',
  2
FROM wedding_invitation
LIMIT 1;

INSERT INTO wedding_gallery (wedding_id, image_url, caption, story_text, section, display_order)
SELECT 
  id,
  'gallery-3.jpg',
  'Persiapan Menuju Hari Bahagia',
  'Setiap detail dipersiapkan dengan penuh cinta dan harapan. Dari memilih bunga hingga merancang undangan, setiap langkah membawa kami lebih dekat ke hari yang paling kami nantikan. Hari di mana kami akan bersatu selamanya.',
  'story',
  3
FROM wedding_invitation
LIMIT 1;