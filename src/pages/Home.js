import { useState, useEffect } from 'react';
import axios from 'axios';
import Page from '../components/Page.js';
import MediaElement from '../features/media/MediaElement.js';
import Modal from '../features/modal/Modal.js';
import data from '../data/HOME';
import useExpandImages from '../hooks/useExpandImages';
import useSlideShow from '../hooks/useSlideShow.js';
import Feature from '../components/Feature.js';
import { GoShieldCheck } from "react-icons/go";
import { api } from '../api/resources';

const Home = () => {
  const [mediaFeatures, setMediaFeatures] = useState(null);
  const [cardCollections, setCardCollections] = useState(null);
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
    if (expandedImages) {
      const features = []
      expandedImages.forEach((collection, i) => {
        const feature = media.features[i]
        const cover = collection[feature.cover] || collection[feature.cover]
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
      <Page
        name={'home'}
        hasHeader={false}
        hasBanner={true}
      >
        <Feature classList={'features'} title={'Magic Find Features'}>
              {
                main.features.map((feature, index) => {
                  return (
                    <div key={index + 1} className="feature">
                      <div className="feature-content">
                        <section className="feature-header">
                          <h2 className="article-title">{feature.title}</h2>
                          <article style={{ backgroundImage: `url(${feature.bgLink})` }} className="feature-image">

                          </article>
                        </section>
                        <section className="feature-body">
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
                        </section>
                      </div>
                    </div>)
                })
              }
        </Feature>
        <Feature classList={'media-feature'} title={'The Secret Lair Drop Artwork'}>
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
        </Feature>
      </Page>
    </>
  )
}

export default Home;
