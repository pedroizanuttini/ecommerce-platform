import './BannerPosition.css'

const BannerPosition = ({image, title, subtitle}) => {
  return (
    <div className='banner-position'>
        <img className='banner-position__bg' src={image} alt="" />
        <div className='banner-position__info'>
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </div>
    </div>
  )
}

export default BannerPosition