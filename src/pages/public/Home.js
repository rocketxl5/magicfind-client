import { useEffect, useRef } from 'react';
import Page from '../../components/Page.js';
import MediaElement from '../../features/modal/components/MediaElement.js';
import Feature from '../../components/Feature.js';
import useFeatureContext from '../../hooks/contexthooks/useFeatureContext.js';
import LeftBtn from '../../features/modal/components/LeftBtn.js';
import RightBtn from '../../features/modal/components/RightBtn.js';
import useViewportContext from '../../hooks/contexthooks/useFeatureContext.js';
import useSlider from '../../hooks/useSlider.js';
import home from '../../data/HOME.json';
import { GoShieldCheck } from "react-icons/go";

const Home = () => {
  const { main } = home;

  const { feature, setFeature, featureProps } = useFeatureContext();
  const { isMobile, viewportWidth } = useViewportContext();
  const {
    handleOffset,
    setSlider,
    offset,
    interval,
    min,
    max,
  } = useSlider();

  const scrollerRef = useRef(null);

  useEffect(() => {
    if (!feature) {
      setFeature(true);
    }
    // Initialization,
    // min : the left most offset coordinate as min
    // interval : the width covered by each slide [100 : 100vw]
    // swipe: abled if mobile else false
    // console.log(featureProps.length)
    // console.log(document.querySelector('[data-media-element]').offsetWidth)


  }, []);

  useEffect(() => {
    if (featureProps) {
      console.log(Math.round(scrollerRef.current?.scrollWidth / featureProps.length))
      setSlider({
        min: scrollerRef.current?.scrollWidth,
        interval: Math.round(scrollerRef.current?.scrollWidth / featureProps.length),
      });
    }
  }, [featureProps])

  useEffect(() => {

  }, [viewportWidth])

  useEffect(() => {
    console.log(offset)
    scrollerRef.current.style.left = `${offset}px`;
  }, [offset])

  const moveSlide = (e) => {
    if (e.target.name === 'snap-left') {
      console.log(offset)
      console.log(interval)
      console.log(min)
      console.log(max)
      if (offset < min) {
        handleOffset(offset - interval)
      }
    }
    else if (e.target.name === 'snap-right') {

      if (offset < max) {
        handleOffset(offset + interval)
      }
    }
  }

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
          {/* <div className="media-scroller-inner">
          </div> */}
          <div className="media-frame">
            <LeftBtn type={'media'} handleClick={moveSlide} />
            <RightBtn type={'media'} handleClick={moveSlide} />

          </div>
          <div className={`media-scroller ${isMobile ? 'snaps-inline' : ''}`} ref={scrollerRef}>
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