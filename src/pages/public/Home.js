import { useEffect } from 'react';
import Page from '../../components/Page.js';
import MediaElement from '../../features/modal/components/MediaElement.js';
import Feature from '../../components/Feature.js';
import useFeatureContext from '../../hooks/contexthooks/useFeatureContext.js';
import home from '../../data/HOME.json';
import { GoShieldCheck } from "react-icons/go";

const Home = () => {
  const { main } = home;

  const { feature, setFeature, featureProps } = useFeatureContext();

  useEffect(() => {
    if (!feature) {
      setFeature(true);
    }
  }, []);

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
              featureProps &&
              featureProps.map((feature, i) => {
                return (
                  <MediaElement
                    key={i}
                    cover={feature.cover}
                    images={feature.images}
                    layouts={feature.layouts}
                    title={feature.title}
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