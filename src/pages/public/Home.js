import { useState, useEffect } from 'react';
import axios from 'axios';
import Page from '../../components/Page.js';
import MediaElement from '../../features/media/MediaElement.js';
import Modal from '../../features/modal/Modal.js';
import data from '../../data/HOME.js';
import useExpandImages from '../../hooks/useExpandImages.js';
import useSlideShow from '../../hooks/useSlideShow.js';
import Feature from '../../components/Feature.js';
import { GoShieldCheck } from "react-icons/go";
import { api } from '../../api/resources.js';

const Home = () => {
  const [mediaFeatures, setMediaFeatures] = useState(null);
  const [cardCollections, setCardCollections] = useState(null);
  const { main, media } = data;

  useEffect(() => {
    const cards = []
    const promises = media.cards.map(async (feature) => {
      const response = await axios.get(`${api.scryfallURL}/cards/search?order=set&q=e%3Asld+${feature.query}&unique=cards`);
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
      const cards = []
      expandedImages.forEach((collection, i) => {
        const card = media.cards[i]
        const cover = collection[card.cover] || collection[card.cover]
        cards.push({
          title: card.title,
          cover: !cover.length ? cover : cover[0],
          images: collection
        })
      })
      setMediaFeatures(cards);
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
        <Feature classList={''} title={'Magic Find Features'}>
          <section className='feature-grid'>
            {
              main.cards.map((card, index) => {
                return (
                  <div key={index + 1} className="feature-card">
                    <div className="flex column gap-1 padding-1 b-radius-5 feature-border">
                      <section>
                        <h2 className="feature-card-title">{card.title}</h2>
                        <div style={{ backgroundImage: `url(${card.bgLink})` }} className="feature-card-image"></div>
                      </section>
                      <section className="feature-card-content">
                        {
                          card.body.map((line, index) => {
                            return (

                              <div key={index} className='flex gap-1 align-center'>
                                <span className='bullet'>
                                  <GoShieldCheck strokeWidth={'1px'} />
                                </span>
                                <p>{line}</p>
                              </div>
                            )
                          })
                        }
                      </section>
                    </div>
                  </div>)
              })
            }
          </section>
        </Feature>
        <Feature classList={'media-feature'} title={'The Secret Lair Drop Artwork'}>
          <div className="media-scroller snaps-inline">
            {
              mediaFeatures &&
              mediaFeatures.map((card, i) => {
                return (
                  <MediaElement key={i + 1} id={i} handleSlideShow={handleSlideShow}>
                    {card.cover}
                    {card.title}
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
