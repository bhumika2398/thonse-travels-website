import { siteInfo } from "../data/siteInfo.js";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href={siteInfo.whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-glass-lg transition-transform duration-300 hover:scale-110"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white">
          <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.5.66 4.83 1.8 6.86L4 29l7.3-1.9a11.9 11.9 0 0 0 4.72.97h.01c6.62 0 12.02-5.4 12.02-12.03C28.05 8.4 22.65 3 16.02 3zm0 21.86h-.01a9.85 9.85 0 0 1-5.02-1.37l-.36-.21-4.33 1.13 1.16-4.22-.24-.43a9.86 9.86 0 0 1-1.5-5.24C5.72 9.5 10.34 4.9 16.02 4.9c2.64 0 5.12 1.03 6.98 2.9a9.78 9.78 0 0 1 2.9 6.97c0 5.68-4.62 10.09-9.88 10.09zm5.62-7.36c-.3-.15-1.8-.89-2.08-1-.28-.1-.48-.15-.68.15-.2.3-.78 1-.96 1.2-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.65-.94-2.26-.25-.6-.5-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.26 5.17 4.57.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.8-.73 2.05-1.44.25-.71.25-1.32.18-1.44-.08-.13-.28-.2-.58-.35z" />
        </svg>
      </a>
      <a
        href={siteInfo.callLink}
        aria-label="Call us now"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-charcoal shadow-glass-lg transition-transform duration-300 hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-charcoal">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
        </svg>
      </a>
    </div>
  );
}
