import { BookOpen, CalendarDays, BadgeDollarSign, Headphones } from "lucide-react";
import '../../../Css/WebsiteCss/MainCss/FeaturesBar.css'

const features = [
  {
    icon: BookOpen,
    iconClass: "icon-purple",
    title: "Thousands of Books",
    subtitle: "Wide & growing collection",
  },
  {
    icon: CalendarDays,
    iconClass: "icon-green",
    title: "Weekly New Arrivals",
    subtitle: "Fresh titles every week",
  },
  {
    icon: BadgeDollarSign,
    iconClass: "icon-amber",
    title: "Affordable Borrowing",
    subtitle: "Rates that fit any budget",
  },
  {
    icon: Headphones,
    iconClass: "icon-red",
    title: "Friendly Support",
    subtitle: "Always here to help",
  },
];

export default function FeaturesBar() {
  return (
    <div className="features-bar">
      {features.map((feat, i) => {
        const Icon = feat.icon;
        return (
          <div key={i} className="feature-item">
            <div className={`feature-icon ${feat.iconClass}`}>
              <Icon size={20} />
            </div>
            <div className="feature-text">
              <p className="feature-title">{feat.title}</p>
              <p className="feature-subtitle">{feat.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
