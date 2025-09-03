'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type Item = { id: string; name: string; avatar?: string };

/* Fallback avatar (SVG inline, claro) */
const FALLBACK_AVATAR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
  <rect width="100%" height="100%" rx="40" ry="40" fill="#e5e7eb"/>
  <circle cx="40" cy="32" r="16" fill="#cbd5e1"/>
  <rect x="16" y="52" width="48" height="18" rx="9" fill="#cbd5e1"/>
</svg>`);

// Componente para manejar fallback con next/image
function Avatar({ src, alt }: { src?: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState<string>(src || FALLBACK_AVATAR);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={40}
      height={40}
      unoptimized
      style={{ borderRadius: '50%', flex: '0 0 auto' }}
      onError={() => setImgSrc(FALLBACK_AVATAR)}
    />
  );
}

export default function RemoteList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const url = 'https://6172cfe5110a740017222e2b.mockapi.io/elements';
    (async () => {
      try {
        const r = await fetch(url);
        if (!r.ok) throw new Error(r.statusText);
        const data: Item[] = await r.json();
        setItems(data);
      } catch (e) {
        setErr(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="meta" aria-busy="true">Loading…</p>;
  if (err) return <p role="alert" className="meta">Error: {err}</p>;

  return (
    <ul className="list">
      {items.map((it) => (
        <li key={it.id} className="list-item">
          <Avatar src={it.avatar} alt={it.name} />
          <span>{it.name}</span>
        </li>
      ))}
    </ul>
  );
}
