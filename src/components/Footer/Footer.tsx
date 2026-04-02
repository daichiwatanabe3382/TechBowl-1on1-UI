const footerLinks = [
  { label: "運営会社", href: "https://techbowl.co.jp" },
  { label: "利用規約", href: "/terms" },
  { label: "プライバシーポリシー", href: "/privacy" },
  { label: "特商法について", href: "/legal" },
  { label: "情報セキュリティ方針", href: "/security" },
];

export default function Footer() {
  return (
    <footer className="bg-[#171722] text-white w-full">
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
        <div className="flex justify-center gap-0 mb-6">
          <a
            href="https://x.com/TechBowl1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="X (Twitter)"
          >
            <img src="/image/X.svg" alt="X" width={32} height={32} />
          </a>
          <a
            href="https://note.com/techbowl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="note"
          >
            <img src="/image/note.svg" alt="note" width={32} height={32} />
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
