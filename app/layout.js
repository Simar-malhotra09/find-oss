import "@styles/globals.css";
import Navbar from "@components/Navbar";

export const metadata = {
  title: "Find-OSS",
  description: "Find hundreds of Open Source Startups to contribute to",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
