import React from 'react';

/* آیکون‌های خطی PARTO (stroke، ۲۴×۲۴) */
const P: Record<string, React.ReactNode> = {
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-4 4.5-5.5 8-5.5s6.5 1.5 8 5.5" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.4" /></>,
  bag: <><path d="M4 8h16l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H6.7a1.5 1.5 0 0 1-1.5-1.3L4 8Z" /><path d="M8.5 8V7a3.5 3.5 0 0 1 7 0v1" /></>,
  card: <><rect x="2.5" y="5" width="19" height="14" rx="3" /><path d="M2.5 10h19M6 15h3" /></>,
  cash: <><rect x="2.5" y="6" width="19" height="12" rx="3" /><circle cx="12" cy="12" r="2.6" /><path d="M6 9.5v.01M18 14.5v.01" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  trash: <path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6.5L20.5 7" /></>,
  send: <path d="M21 4 3 11l5.5 2L10 19l3-3.5 4.5 3.5L21 4ZM8.5 13 21 4" />,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="6" rx="2" /><rect x="17" y="13" width="4" height="6" rx="2" /><path d="M19 19c0 1.5-2 2.5-5 2.5" /></>,
  shield: <path d="M12 3 5 6v5.5c0 4.4 3 7.6 7 9.5 4-1.9 7-5.1 7-9.5V6l-7-3Z" />,
  shieldCheck: <><path d="M12 3 5 6v5.5c0 4.4 3 7.6 7 9.5 4-1.9 7-5.1 7-9.5V6l-7-3Z" /><path d="m8.8 12 2.4 2.4 4.2-4.4" /></>,
  truck: <><path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /><path d="M1 9h3M0 12h3" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chevD: <path d="m6 9 6 6 6-6" />,
  chevL: <path d="m15 6-6 6 6 6" />,
  chevR: <path d="m9 6 6 6-6 6" />,
  chevU: <path d="m6 15 6-6 6 6" />,
  arrowL: <path d="M19 12H5M11 6l-6 6 6 6" />,
  arrowR: <path d="M5 12h14M13 6l6 6-6 6" />,
  eye: <><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  eyeOff: <><path d="M2 12s3.6-6.5 10-6.5c2 0 3.7.6 5.2 1.5M22 12s-3.6 6.5-10 6.5c-2 0-3.7-.6-5.2-1.5" /><path d="m4 4 16 16M9.8 9.8a3 3 0 0 0 4.4 4.4" /></>,
  heart: <path d="M12 20s-7-4.4-9-9.2C1.6 7.4 4 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3 0 5.4 2.9 4 6.3C19 15.6 12 20 12 20Z" />,
  login: <path d="M14 4h3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-3M4 12h11M11 8l4 4-4 4" />,
  gift: <><rect x="3" y="9" width="18" height="11" rx="2" /><path d="M12 9v11M3 13h18" /><path d="M12 9c-2.5 0-4.5-1-4.5-2.7S9 4 10.4 4C11.6 4 12 6.2 12 9Zm0 0c2.5 0 4.5-1 4.5-2.7S15 4 13.6 4C12.4 4 12 6.2 12 9Z" /></>,
  pencil: <path d="M4 20l1-4L16.5 4.5a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8L8 19l-4 1ZM14 7l3 3" />,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
  doc: <><path d="M6 3h8l4 4v14H6V3Z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  box: <><path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z" /><path d="m3.5 7.5 8.5 4.5 8.5-4.5M12 12v9M7.7 5.3l8.6 4.5" /></>,
  chat: <><path d="M4 5h16v11H11l-4.5 4v-4H4V5Z" /><path d="M8 9.5h8M8 12.5h5" /></>,
  chatDots: <><path d="M4 5h16v11H11l-4.5 4v-4H4V5Z" /><path d="M8.5 10.5v.01M12 10.5v.01M15.5 10.5v.01" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  play: <path d="M9 6.5v11l9-5.5-9-5.5Z" />,
  whatsapp: <><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20Z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2L9 8.5Z" /></>,
  instagram: <><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17" cy="7" r=".8" fill="currentColor" /></>,
  ring: <><circle cx="12" cy="15" r="5.5" /><path d="m9 6.5 1.5-2.5h3L15 6.5l-3 2.5-3-2.5ZM9 6.5h6" /></>,
  medal: <><circle cx="12" cy="9" r="5" /><path d="m9 13.5-2 7 5-2.5 5 2.5-2-7M10 9l1.5 1.5L14.5 7.5" /></>,
  gem: <><path d="M7 4h10l4 5-9 11L3 9l4-5Z" /><path d="M3 9h18M9 4l-2 5 5 11 5-11-2-5M12 4v5" /></>,
  secureCard: <><rect x="3" y="5.5" width="18" height="13" rx="3" /><path d="M3 10h18" /><path d="M7 14.5h4" /></>,
  returnBox: <><path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7Z" /><path d="M4 8.5 12 13l8-4.5M12 13v7" /></>,
  zoomIn: <path d="M12 5v14M5 12h14" />,
  zoomOut: <path d="M5 12h14" />,
};

export function Ico({ name, className = 'h-5 w-5', sw = 1.5 }: { name: string; className?: string; sw?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {P[name]}
    </svg>
  );
}

/* آیکون‌های پر (برندها) */
export function AppleIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

export function GoogleIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.500-.2-2.200H12v4.200h5.900a5 5 0 0 1-2.200 3.300v2.700h3.500c2.100-1.900 3.300-4.700 3.300-8Z" />
      <path fill="#34A853" d="M12 23c3 0 5.500-1 7.300-2.700l-3.500-2.700c-1 .7-2.200 1.100-3.800 1.100-2.900 0-5.400-2-6.300-4.600H2.100v2.800A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.700 14.100a6.600 6.600 0 0 1 0-4.200V7.100H2.100a11 11 0 0 0 0 9.800l3.600-2.800Z" />
      <path fill="#EA4335" d="M12 5.400c1.600 0 3.100.6 4.200 1.700l3.100-3.100A11 11 0 0 0 2.100 7.100l3.600 2.800C6.600 7.400 9.100 5.400 12 5.400Z" />
    </svg>
  );
}

export function DiamondLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3h24l10 12-22 22L2 15 12 3Z" />
      <path d="M2 15h44M17 3l-5 12 12 22 12-22-5-12M24 3l-5 12M24 3l5 12" />
    </svg>
  );
}
