import { useState, useEffect } from 'react';
import Page from '../../components/Page.js';
import MediaElement from '../../features/modal/components/MediaElement.js';
import useSlideShow from '../../hooks/useSlideShow.js';
import Feature from '../../components/Feature.js';
import useModal from '../../hooks/useModal.js';
import useModalContext from '../../hooks/contexthooks/useModalContext.js';
import useFetch from '../../hooks/useFetch.js';
import home from '../../data/HOME.json';
import mediaFeatures from '../../data/MEDIA_FEATURES.json';
import { formatLayout } from '../../features/modal/services/formatLayout.js';
import { GoShieldCheck } from "react-icons/go";


const Home = () => {
  const [covers, setCovers] = useState(null);
  const { main } = home;
  const { features } = mediaFeatures;

  const { fetchAllAPI, error, response } = useFetch();
  // const { setFeatureSlides } = useSlideShow();

  const { featureImages, handleSetModal } = useModalContext();

  useEffect(() => {
    const queries = features.map(feature => `/cards/search?order=set&q=e%3Asld+${feature.query}&unique=cards`);
    fetchAllAPI(queries);
  }, []);

  useEffect(() => {
    if (response) {
      // const props = new Map([
      //   [
      //     'layouts',
      //     response.map(res => res.map(obj => formatLayout(obj.layout)))
      //   ],
      //   [
      //     'uris',
      //     response
      //       .map(res => res
      //         .map(obj => obj.card_faces ?
      //           obj.card_faces
      //             .map(face => face.image_uris.normal) :
      //           obj.image_uris.normal))
      //   ]
      // ]);
      // if (props) {
        handleSetModal({
          type: 'feature',
          data: response
        })
      // }
    }
  }, [response]);

  // useEffect(() => {
  //   if (images) {
  //     setCovers(
  //       images.map((image, i) => image[features[i].cover][0] || images[i][features[i].cover])
  //     )
  //   }
  // }, [images])

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

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
              featureImages &&
              features.map((feature, i) => {
                return (
                  <MediaElement
                    key={i}
                    title={feature.title}
                    image={featureImages[i][feature.cover][0] || featureImages[i][feature.cover]}
                  />
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