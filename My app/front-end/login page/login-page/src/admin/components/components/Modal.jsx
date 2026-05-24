import Icon from "./Icon";
import { icons } from "../utils";
import "./Modal.css";

const Modal = ({ title, onClose, children }) => (
  <div className="modal-overlay">
    <div className="modal-box">
      <div className="modal-header">
        <h3 className="modal-title">{title}</h3>
        <button className="modal-close" onClick={onClose}>
          <Icon d={icons.x} size={20} />
        </button>
      </div>
      <div className="modal-body">{children}</div>
    </div>
  </div>
);

export default Modal;
