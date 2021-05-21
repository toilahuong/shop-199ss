export default function ContentPost(props) {
    const {item} = props;
    return (
        <div className="item">
            <a href={item.url}>
                <div className="item__thumbnail">
                    <img loading="lazy" src={item.thumbnail} className="img-fluid" alt={item.title}/>
                </div>
                <h4>
                    {item.title}
                </h4>
                <p>
                    Bạn đã từng nghe đến áo phông unisex bao giờ chưa? Phong cách này có gì đặc biệt và kết hợp như thế nào cho bắt mắt, hãy cùng COCCACHSHOP tìm hiểu nhé.
                </p>
            </a>
        </div>
    )
}