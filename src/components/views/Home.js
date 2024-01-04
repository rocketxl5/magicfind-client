import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TbCards } from "react-icons/tb";
import { FaStore } from "react-icons/fa";
import { FaCommentsDollar } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { api } from '../../api/resources';
import useImageLoader from '../../hooks/useImageLoader';

const Home = () => {
  const [cards, setCards] = useState([]);

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
      })
      .catch(err => { console.log(err.message) })
  }, [])

  const imagesLoaded = useImageLoader(cards);

  const mainFeature = [
    {
      icon: <TbCards size={35} />,
      text: [
        'Build and organize your Virtual Magic the Gathering card Collection.',
        'Easily add any of the 20 000+ card titles from the MTG card library to your Collection.',
        'Organize your cards according to your preferences.',
        'Build, save and update your decks.'
      ],
      title: 'Collect'
    },
    {
      icon: <FaStore size={30} />,
      text: [
        'Publish your collection cards to push them to your Virtual Store.',
        'Sell at the price range established by the community. Which is hihger than what retailers would give you.',
        'Organize your cards according to your preferences.',
        'Build, save and update your decks.'
      ],
      title: 'Sell'
    },
    {
      icon: <FaCommentsDollar size={30} />,
      text: [
        'Search the Magic Find Catalog list for a specific card',
        'Compare prices and conditions.',
        'Keep track of your purchases.',
        'Find sellers close to your area.'
      ],
      title: 'Buy'
    },
  ]
  return (
    <>
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
            <header>
              <h2>What Is Magic Find</h2>
            </header>
            <div className="site-features">
            {
              mainFeature.map(feature => {
                return (
                  <div className="feature-element">
                <header>
                      <div className="feature-element-icon">
                    {feature.icon}
                  </div>
                </header>
                <main>
                  {
                        feature.text.map((line, index) => {
                      return (
                        <p key={index}>
                          {/* <span className="line-icon">
                            <GoShieldCheck size={13} strokeWidth={'1px'} />
                          </span> */}
                          {line}
                        </p>
                      )
                    })
                  }
                </main>
                <footer>
                  <div className="feature-title">
                    <h2>{feature.title}</h2>
                  </div>
                </footer>
              </div>)
          })
            }
            </div>
      </section>

          <section className="feature-section">
            <header>
              <h2 className="title"><span>The Secret Lair Drop Artwork</span>
                <span className="feature-icon">
                </span>
              </h2>

            </header>
            <div className="media-scroller snaps-inline">
              {
                imagesLoaded &&
                cards.map((card, index) => {
                  return (
                    <>
                      <div className="media-element" key={index}>
                        {
                          <img src={card.image_uris?.normal || card.card_faces[0]?.image_uris.normal} alt={card.name} />
                        }
                        <p>{card.artist}</p>
                      </div>
                    </>
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
