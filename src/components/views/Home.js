import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoShieldCheck } from "react-icons/go";
import CardImage from './search/CardImage';
import Modal from './search/Modal';
import useLoadImage from '../../hooks/useLoadImage';
import useExpandImage from '../../hooks/useExpandImage';
import useModalView from '../../hooks/useModalView';
import { api } from '../../api/resources';

const Home = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const features_content = [
    {
      bgLink: 'https://cards.scryfall.io/art_crop/front/6/7/673a67b2-fbb0-4be4-9edd-93946a583f23.jpg?1692938189',
      body: [
        'Compare card prices & conditions',
        'Get in touch with the sellers',
        'Find sellers in your area',
        'Access restricted search features',
        'Keep track of your purchases',
      ],
      title: 'Buy',
      button: 'Read More',

    },
    {
      bgLink: 'https://cards.scryfall.io/art_crop/front/7/9/79b0e035-8716-469d-99ae-a530cd96ef09.jpg?1562558471',
      body: [
        'Create your store',
        'Customize your landing page',
        'Update your store inventory',
        'Increase card visibility',
        'Keep track of your sales',
      ],
      title: 'Sell',
      button: 'Read More',
    },
    {
      bgLink: 'https://cards.scryfall.io/large/front/1/8/18b77346-d6e4-4d2f-b054-19fdea686d40.jpg?1682689593',
      body: [
        'Create a collector profile',
        'Manage your card collection',
        'Add any of the 20 000+ MTG cards',
        'Customize your collection',
        'Save your preferences',
      ],
      title: 'Collect',
      button: 'Read More',
    },
    {
      bgLink: 'https://cards.scryfall.io/art_crop/front/e/3/e37da81e-be12-45a2-9128-376f1ad7b3e8.jpg?1562202585',
      body: [
        'Build decks in any format',
        'Share them with the community',
        'Find members with similar taste',
        'Create wishlists',
        'Have fun!',
      ],
      title: 'Build',
      button: 'Read More',
    },
  ]

  useEffect(() => {
    const query = 'sld'
    const iteration = 10;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = {
      method: 'GET',
      headers: headers,
    }
    fetch(`${api.serverURL}/api/cards/feature/${query}/${iteration}`, options)
      .then(res => res.json())
      .then(data => {
        setCards(data.results)
        console.log(data.results)
      })
      .catch(err => { console.log(err.message) })
  }, [])

  const { imagesLoaded } = useLoadImage(cards);
  const [view, updateCardView] = useModalView(handleCardView)

  function handleCardView(e, layout, expandedImage) {
    e.stopPropagation();
    updateCardView(layout, expandedImage)

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
                features_content.map(content => {
                return (
                  <div className="feature">
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
            <div className="media-scroller snaps-inline">

              {
                cards.map((card, index) => {
                  return (
                    <div className="media-element">
                      <CardImage key={index} card={card} handleCardView={handleCardView} />
                      {/* <div className="media-element" key={index} onClick={(e) => handleCardView()}>
                        {
                          <img src={card.image_uris?.normal || card.card_faces[0]?.image_uris.normal} alt={card.name} />
                        }
                        <p>{card.artist}</p>*/}
                    </div> 
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
