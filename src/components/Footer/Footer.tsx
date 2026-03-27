const footerLinks = [
  { label: "運営会社", href: "https://techbowl.co.jp" },
  { label: "利用規約", href: "/terms" },
  { label: "プライバシーポリシー", href: "/privacy" },
  { label: "特商法について", href: "/legal" },
  { label: "情報セキュリティ方針", href: "/security" },
];

function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function NoteIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm0-8H9V7h6v2z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#2d2d44] text-white w-full">
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6 mb-6">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="https://x.com/techbowl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="X (Twitter)"
          >
            <XIcon size={20} />
          </a>
          <a
            href="https://note.com/techbowl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="note"
          >
            <span className="text-xl font-bold">n</span>
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 mb-6" />

        {/* Copyright */}
        <p className="text-center text-sm text-gray-400">
          © TechBowl Inc. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
