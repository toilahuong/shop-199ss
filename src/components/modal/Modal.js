export default function Modal(props) {
    const {item, handler} = props;
    return (
        <div className="modal">
            <div className="modal-bg" onClick={handler}></div>
            <div className="modal-main">
                {item.title}
            </div>
        </div>
    )
}