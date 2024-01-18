import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoShieldCheck } from "react-icons/go";
import Modal from './search/Modal';
import useExpandImages from '../../hooks/useExpandImages';
import MediaElement from './MediaElement';
import data from '../../assets/data/HOME_PAGE';
import { api } from '../../api/resources';
import useModalSlide from '../../hooks/useModalSlide';

const Home = () => {
  const [mediaFeatures, setMediaFeatures] = useState(null);
  const [cardCollections, setCardCollections] = useState(null);
  const navigate = useNavigate();
  const { media, app } = data;

  useEffect(() => {
    const cards = []
    const promises = media.features.map(async (feature) => {
      const response = await axios.get(`${api.skryfallURL}/cards/search?order=set&q=e%3Asld+${feature.query}&unique=cards`);
      return response;
    })

    Promise.all(promises)
      .then(responses => {
        responses.forEach((res, i) => {
          cards.push(res.data.data);
        })
        setCardCollections(cards);
      })
      .catch((error) => { throw new Error(error) })

  }, [])

  const { expandedImages } = useExpandImages(cardCollections);

  const [view, updateSliderView] = useModalSlide(handleSliderView, expandedImages)

  function handleSliderView(e) {
    e.stopPropagation();
    // console.log(e.target.name)
    updateSliderView(e)
  }

  useEffect(() => {
    if (expandedImages) {
      const features = []
      console.log(expandedImages)
      expandedImages.forEach((images, i) => {
        const feature = media.features[i]
        features.push({
          title: feature.title,
          cover: !images[feature.cover].element.length ? images[feature.cover].element : images[feature.cover].element[0],
          images: images
        })
      })
      setMediaFeatures(features)
    }
  }, [expandedImages])

  useEffect(() => {
    console.log(mediaFeatures)
  }, [mediaFeatures])
  return (
    <>
      <Modal open={view.open}>
        {view.component}
      </Modal>
      <section className='banner-section'>
        <div className="banner home-page-banner">
          <Link className="banner-link" to="/signup">
            Join Magic Find
          </Link>                                  
        </div>
      </section>
      <>
        <main className="main-content">
          <section className="feature-section">
            <header className="feature-section-header">
              <h2 className="feature-section-title">Magic Find Features</h2>
            </header>
            <div className="features grid-section">
            {
                app.features.map((feature, index) => {
                return (
                  <div key={index} className="feature">
                    <div className="feature-content">
                    <header className="feature-header">
                        <h2 className="feature-title">{feature.title}</h2>
                        <div style={{ backgroundImage: `url(${feature.bgLink})` }} className="feature-image">

                        </div>
                    </header>
                    <main className="feature-body">
                        { 
                          feature.body.map((line, index) => {
                      return (

                        <p key={index}>
                          <span className="line-icon">
                            <GoShieldCheck strokeWidth={'1px'} />
                          </span>
                          <span>
                          {line}
                          </span>
                        </p>
                      )
                    })
                        }
                </main>
                    <footer className="feature-footer">

                        <button className="btn" type="button" onClick={() => navigate('/about')}>{feature.button}</button>
                </footer>
                    </div>
              </div>)
          })
            }
            </div>
          </section>
          <section className="feature-section media">
            <header className="feature-section-header">
              <h2 className="feature-section-title">
                <span>The Secret Lair Drop Artwork</span>
                <span className="feature-section-icon">
                </span>
              </h2>
            </header>
            {/* <CardImage key={index} card={card} handleCardView={handleCardView} /> */}
            <div className="media-scroller snaps-inline">
              {
                mediaFeatures &&
                mediaFeatures.map((feature, i) => {
                  return (
                    <MediaElement key={i} id={i} handleSliderView={handleSliderView}>
                      {feature.cover}
                      {feature.title}
                    </MediaElement>
                  )
                })
              }
            </div>
          </section>
        </main>
      </>
    </>
  )
}

export default Home;
