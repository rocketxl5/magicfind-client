import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoShieldCheck } from "react-icons/go";
import CardImage from './search/CardImage';
import Modal from './search/Modal';
import useLoadImage from '../../hooks/useLoadImage';
import useExpandImage from '../../hooks/useExpandImage';
import useModalView from '../../hooks/useModalView';
import data from '../../assets/data/HOME_PAGE';
import { api } from '../../api/resources';

const Home = () => {
  const [cardImages, setCardImages] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [featureData, setFeatureData] = useState(null)
  const navigate = useNavigate();
  const { site_features, main_feature } = data;
  // const sldSeries = main_feature;



  useEffect(() => {
    let images = [];
    const promises = main_feature.map(async (series, index) => {
      const response = await axios.get(`${api.skryfallURL}/cards/search?order=set&q=e%3Asld+${series.query}&unique=cards`);
      images = [...images, ...response.data.data]
      setFeatureData({ cards: response.data.data, index: index })
      return response;
    })

    Promise.all(promises)
      .then(responses => responses && console.log(featureData))
      .catch((error) => { throw new Error(error) })

    setCardImages(images)
    setHasLoaded(true)
  }, [])

  useEffect(() => {
    if (featureData) {
      const { cards, index } = featureData;
      main_feature[index].cards = [...cards];
      main_feature[index].art = cards[main_feature[index].index]?.image_uris?.normal || cards[main_feature[index].index]?.card_faces[0]?.image_uris?.normal;
    }
  }, [featureData])

  const { imagesLoaded } = useLoadImage(cardImages);
  const [view, updateCardView] = useModalView(handleCardView)

  function handleCardView(e, layout, expandedImage) {
    // e.stopPropagation();
    // updateCardView(layout, expandedImage)

  }
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
                site_features.map((content, index) => {
                return (
                  <div key={index} className="feature">
                    <div className="feature-content">
                    <header className="feature-header">
                        <h2 className="feature-title">{content.title}</h2>
                      <div style={{ backgroundImage: `url(${content.bgLink})` }} className="feature-image" >

                        </div>
                    </header>
                    <main className="feature-body">
                  {
                        content.body.map((line, index) => {
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

                        <button className="btn" type="button" onClick={() => navigate('/about')}>{content.button}</button>
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
                imagesLoaded ?
                  (main_feature.map((feature, index) => {
                // console.log(card?.image_uris?.small || card?.card_faces[0]?.image_uris?.small)
                  return (
                    <div key={index} className="media-element" onClick={(e) => handleCardView()}>
                        {
                        <img src={feature.art} alt={feature.title} />
                        }
                      <p>{feature.title}</p>
                    </div> 
                  )
                  })) : (
                    ''
                  )
              }
            </div>
      </section>

        </main>
      </>
    </>
  )
}

export default Home;
