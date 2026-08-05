import SiteFooter from "../SiteFooter";
import SiteHeader from "../SiteHeader";
import "../site-chrome.css";
import "./guide-system.css";

export default function GuidesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div id="page-top" className="guide-section-shell">
      <SiteHeader />
      <div className="guide-route-content">{children}</div>
      <SiteFooter />
    </div>
  );
}
