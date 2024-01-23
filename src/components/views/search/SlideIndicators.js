import { FaRegCircle, FaSatelliteDish } from "react-icons/fa6";
import { FaRegCircleDot } from "react-icons/fa6";

const SlideIndicators = ({ slides, currentIndicator }) => {
    console.log(slides)
    console.log(currentIndicator)
    return (
        <div className="indicators">
            {
                slides &&
                slides.map((slide, index) => {
                    return (
                        <span key={index} className="indicator">
                            {currentIndicator === index ? <FaRegCircleDot /> : <FaRegCircle />}
                        </span>
                    )
                })

            }
        </div>
    )
}

export default SlideIndicators
