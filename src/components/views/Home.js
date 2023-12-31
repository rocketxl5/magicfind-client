import { Link } from 'react-router-dom';
import { TbCards } from "react-icons/tb";
import { FaStore } from "react-icons/fa";
import { FaCommentsDollar } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
const Home = () => {

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
      title: 'Collect'
    },
    {
      icon: <FaCommentsDollar size={30} />,
      text: [
        'Search the Magic Find Catalog list for a specific cards',
        'Compare prices and conditions.',
        'Keep track of your purchasses.',
        'Find sellers close to your area.',
        'Make an offer of ask questions to the sellers through Magic Fink email modules.'
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
      <section className="features-section">
            {
              mainFeature.map(feature => {
                return (
              <div className="feature">
                <header>
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                </header>
                <main>
                  {
                    feature.text.map(line => {
                      return (
                        <p>
                          <span className="line-icon">
                            <GoShieldCheck size={13} strokeWidth={'1px'} />
                          </span>
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
      </section>

      <section className="features-section special-feature">
        <header>
          <h2>The Secret Lair Artwork</h2>
        </header>
      </section>

        </main>
      </>
    </>
  )
}

export default Home;
