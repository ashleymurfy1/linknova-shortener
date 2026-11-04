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
      <head>
        {/* Skrip Iklan Popunder */}
        <script src="https://pl31879658.profitableratecpmnetwork.com/4f/bf/91/4fbf91988c1f25c795f3884bb487ee94.js"></script>
      </head>
      <body>
        {/* Skrip Iklan Social Bar */}
        <script data-cfasync="false" src="https://brijmohan.org/14/61369f51f53aa1b77e21533250f4ac18" async></script>
        
        {children}
      </body>
    </html>
  );
}
