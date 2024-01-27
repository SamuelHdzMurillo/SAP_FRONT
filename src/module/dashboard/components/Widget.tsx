import { WidgetI } from "./Widgets";

const Widget = ({ icon, value, title, index }: WidgetI) => {
  return (
    <div className="widget">
      <div className="widget-content">
        <div className={`icon icon-${index + 1}`}>{icon}</div>
        <p>{value}</p>
      </div>
      <h2 className="widget-title">{title}</h2>
    </div>
  );
};

export default Widget;
