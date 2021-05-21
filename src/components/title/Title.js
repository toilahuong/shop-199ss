Title.prototype.color = "#f5f5f5";
export default function Title(props) {
    const {url, title, color} = props;
    return (
        <h2 className={"title " + color}>
            <a href={url}>{title}</a>
        </h2>
    )
}