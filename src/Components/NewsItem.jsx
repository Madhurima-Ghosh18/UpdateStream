import image from '../assets/news.jpg'

const NewsItem = ({title, description, src, url}) => {
  return (
    <div className="col-md-3 mb-3">
      <div className="card h-100 bg-dark text-light">
        <img src={src ? src : image} className="card-img-top" alt="..." style={{height: "200px", objectFit: "cover"}}/>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title.slice(0,50)}{title.length > 50 ? "..." : ""}</h5>
          <p className="card-text flex-grow-1">
            {description 
              ? `${description.slice(0,90)}${description.length > 90 ? "..." : ""}`
              : "Stay updated with breaking news, in-depth analysis, and real-time reports on global events."}
          </p>
          <a href={url} className="btn btn-primary mt-auto">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
