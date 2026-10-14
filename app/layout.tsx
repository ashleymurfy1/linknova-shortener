import './globals.css';

export const metadata = {
  title: 'LinkNova Shortener',
  description: 'Safelink shortener untuk monetisasi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
