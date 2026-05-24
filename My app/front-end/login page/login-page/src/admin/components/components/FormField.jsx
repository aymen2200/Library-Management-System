import "./FormField.css";

export const FormField = ({ label, children }) => (
  <div className="form-field">
    <label className="form-label">{label}</label>
    {children}
  </div>
);

export const Input = (props) => <input className="form-input" {...props} />;

export const Select = ({ children, ...props }) => (
  <select className="form-input form-select" {...props}>
    {children}
  </select>
);
