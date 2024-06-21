import { useEffect } from 'react';
import Page from '../../components/Page.js';
import MediaElement from '../../features/media/MediaElement.js';
import home from '../../data/HOME.json';
import mediaFeatures from '../../data/MEDIA_FEATURES.json';
import useSlideShow from '../../hooks/useSlideShow.js';
import Feature from '../../components/Feature.js';
import { GoShieldCheck } from "react-icons/go";

import useModalContext from '../../hooks/contexthooks/useModalContext.js';
import useFetch from '../../hooks/useFetch.js';
import useCardLayout from '../../hooks/useCardLayout.js';

const Home = () => {
  const { main } = home;
  const { features } = mediaFeatures;

  const { images } = useModalContext();
  const { fetchAllAPI, error, response } = useFetch();
  const { setModalSlides } = useSlideShow();
  const { layouts, layout } = useCardLayout();


  useEffect(() => {
    fetchAllAPI(features.map(feature => {
      return `/cards/search?order=set&q=e%3Asld+${feature.query}&unique=cards`;
    }));
  }, []);

  useEffect(() => {
    if (response) {
      setModalSlides(response);
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (layouts) {
      console.log(layouts)
    }
  }, [layouts])

  return (
    <>
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
                      <ul className="feature-list">
                        {
                          card.body.map((line, index) => {
                            return (

                              <li key={index} >
                                <p>
                                  <span className='bullet'>
                                  <GoShieldCheck strokeWidth={'1px'} />
                                </span>
                                  <span className='line'>
                                    {line}
                                  </span>
                                </p>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  </div>)
              })
            }
          </section>
        </Feature>
        <Feature classList={'media-feature'} title={'The Secret Lair Drop Artwork'}>
          <div className="media-scroller snaps-inline">
            {
              images &&
              features.map((feature, i) => {
                return (
                  <MediaElement key={i} title={feature.title} image={images[i][feature.cover]} />
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
