import Widget from "./Widget";
export interface WidgetI {
  icon: any;
  value: number;
  title: string;
  index?: number;
}
export interface WidgetsProps {
  widgets: WidgetI[];
}
const Widgets = ({ widgets }: WidgetsProps) => {
  return (
    <div className="widgets">
      {widgets.map(({ icon, value, title }, index) => (
        <Widget
          key={index}
          icon={icon}
          value={value}
          title={title}
          index={index}
        />
      ))}
    </div>
  );
};

export default Widgets;
