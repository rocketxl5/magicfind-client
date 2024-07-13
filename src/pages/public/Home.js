import { useEffect } from 'react';
import List from '../../components/List.js';
import Page from '../../components/Page.js';
import useFeatureContext from '../../hooks/contexthooks/useFeatureContext.js';
import home from '../../data/HOME.json';
import MediaScroller from '../../components/MediaScroller.js';

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
        <div className='feature media-feature'>
          <h2 className='feature-title'>The Secret Lair Artwork</h2>
          {featureProps && <MediaScroller props={featureProps} />}
        </div>
        <div className='feature'>
          <h2 className='feature-title'>Magic Find Features</h2>
          <List listType={'card-list'} itemType={'feature-card'} items={main.cards} />
        </div>
      </Page>
    </>
  )
}

export default Home;