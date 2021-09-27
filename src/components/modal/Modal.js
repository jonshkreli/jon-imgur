import "./modal.css"

export const Modal = ({onClose, show, content}) => {

    if (!show) {
        return null;
    }
    return (
        <div className="modal" id="modal">
            <h2>Modal Window</h2>
            <div className="content">{content}</div>
            <div className="actions">
                <button className="toggle-button" onClick={onClose}>
                    close
                </button>
            </div>
        </div>
    );
}
