import "./Badge.css";

const colorMap = {
  green:  "badge--green",
  red:    "badge--red",
  yellow: "badge--yellow",
  blue:   "badge--blue",
  gray:   "badge--gray",
};

const Badge = ({ label, color }) => {
  const cls = colorMap[color] || colorMap.gray;
  return <span className={`badge ${cls}`}>{label}</span>;
};

export default Badge;
