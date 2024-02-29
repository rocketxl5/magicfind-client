import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MediaElement from '../features/media/MediaElement.js';
import Modal from '../features/modal/Modal.js';
import { GoShieldCheck } from "react-icons/go";
import data from '../data/HOME';
import useExpandImages from '../hooks/useExpandImages';
import useSlideShow from '../hooks/useSlideShow.js';
import { api } from '../api/resources';

const Home = () => {
  const [mediaFeatures, setMediaFeatures] = useState(null);
  const [cardCollections, setCardCollections] = useState(null);
  const navigate = useNavigate();
  const { main, media } = data;

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

  const [view, updateSlideShow] = useSlideShow(handleSlideShow, expandedImages)

  function handleSlideShow(e, id) {
    e.stopPropagation();
    updateSlideShow(e.target.name, id)
  }

  useEffect(() => {
    // console.log(expandedImages)
    if (expandedImages) {
      const features = []
      expandedImages.forEach((collection, i) => {
        // console.log(collection)
        const feature = media.features[i]
        const cover = collection[feature.cover] || collection[feature.cover]
        // console.log(cover)
        features.push({
          title: feature.title,
          cover: !cover.length ? cover : cover[0],
          images: collection
        })
      })
      setMediaFeatures(features)
    }
  }, [expandedImages])

  return (
    <>
      <Modal open={view.open}>
        {view.component}
      </Modal>

      <>
        <main className="main-content home">
          <section className="feature-section">
            <header className="section-header">
              <h2 className="section-title">Magic Find Features</h2>
            </header>
            <div className="features grid-section">
              {
                main.features.map((feature, index) => {
                  return (
                    <div key={index + 1} className="feature">
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
            <header className="section-header">
              <h2 className="section-title">
                <span>The Secret Lair Drop Artwork</span>
                <span className="feature-section-icon">
                </span>
              </h2>
            </header>
            <div className="media-scroller snaps-inline">
              {
                mediaFeatures &&
                mediaFeatures.map((feature, i) => {
                  return (
                    <MediaElement key={i + 1} id={i} handleSlideShow={handleSlideShow}>
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
