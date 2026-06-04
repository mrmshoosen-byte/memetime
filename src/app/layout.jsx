import '@/styles/globals.css';

export const metadata = {
  title: 'Memecoin Clock - Time Travel Portal',
  description: 'Interactive memecoin news and stats dashboard with time-travel clock',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
