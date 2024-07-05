import MainMenuComponent from "@/components/main-menu.mjs";
import "./globals.css";

export const metadata = {
  title: "Next.js Page Routing & Rendering",
  description: "Learn how to route to different pages.",
};

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <div id="page">
          <MainMenuComponent/>
          {children}
        </div>
      </body>
    </html>
  );
}
