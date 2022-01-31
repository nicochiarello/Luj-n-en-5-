import React,{useState,useEffect} from 'react'
import './news-slider.css'
import Slider from 'react-slick'

const NewsSlider = (props) => {

    
    const [data,setData] = useState(props.data)
    
    useEffect(()=>{
        
        console.log(props.data)
    },[])

    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        swipeToSlide: true,
        nextArrow: <nextArrow/>,
        prevArrow: <prevArrow/>,
    }


    return (
      <div className="slider-cards">
        <Slider {...settings}>
        <h1>{props.data.map((i)=><div>{i.title}</div>)}</h1>

          <div className="simple-slider-card">
            <div className="s-card">
              <div className="s-card-info-container">
                <img
                  src="https://tn.com.ar/resizer/HzL9v0UOuZQGiYOt4D6GuQ2CF4o=/767x0/smart/filters:quality(60)/cloudfront-us-east-1.images.arcpublishing.com/artear/QMDFNR5T2JEHPII7QKOJAFPLG4.jpg"
                  alt=""
                />
                <div className="s-card-info">
                  <p>
                    <span>Deportes</span>
                  </p>
                  <p>
                    El terminante aviso de xavi y barcelona sobre julian alvarez
                  </p>
                  <p>
                    <span>nico</span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="simple-slider-card">
            <div className="s-card">
              <div className="s-card-info-container">
                <img
                  src="https://tn.com.ar/resizer/HzL9v0UOuZQGiYOt4D6GuQ2CF4o=/767x0/smart/filters:quality(60)/cloudfront-us-east-1.images.arcpublishing.com/artear/QMDFNR5T2JEHPII7QKOJAFPLG4.jpg"
                  alt=""
                />
                <div className="s-card-info">
                  <p>
                    <span>Deportes</span>
                  </p>
                  <p>
                    El terminante aviso de xavi y barcelona sobre julian alvarez
                  </p>
                  <p>
                    <span>nico</span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="simple-slider-card">
            <div className="s-card">
              <div className="s-card-info-container">
                <img
                  src="https://tn.com.ar/resizer/HzL9v0UOuZQGiYOt4D6GuQ2CF4o=/767x0/smart/filters:quality(60)/cloudfront-us-east-1.images.arcpublishing.com/artear/QMDFNR5T2JEHPII7QKOJAFPLG4.jpg"
                  alt=""
                />
                <div className="s-card-info">
                  <p>
                    <span>Deportes</span>
                  </p>
                  <p>
                    El terminante aviso de xavi y barcelona sobre julian alvarez
                  </p>
                  <p>
                    <span>nico</span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="simple-slider-card">
            <div className="s-card">
              <div className="s-card-info-container">
                <img
                  src="https://tn.com.ar/resizer/HzL9v0UOuZQGiYOt4D6GuQ2CF4o=/767x0/smart/filters:quality(60)/cloudfront-us-east-1.images.arcpublishing.com/artear/QMDFNR5T2JEHPII7QKOJAFPLG4.jpg"
                  alt=""
                />
                <div className="s-card-info">
                  <p>
                    <span>Deportes</span>
                  </p>
                  <p>
                    El terminante aviso de xavi y barcelona sobre julian alvarez
                  </p>
                  <p>
                    <span>nico</span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
}

export default NewsSlider
