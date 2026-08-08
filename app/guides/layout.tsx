import "./guide-system.css";

export default function GuidesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="guide-section-shell guide-route-content">{children}</div>;
}
