import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Feature from '../components/Feature';
import data from '../data/PAGES.json';

const About = () => {
  const sections = [
    {
      header: 'What it is',
      paragraphs: [
        <>
          Magic Find is an interactive environment where you can buy and sell
          Magic the Gathering cards directly from and to other members of the Magic Find community
          from around the world.
        </>,
        <>
          The goal of Magic Find is to give you the opportunity to sell your
          cards without having to settle for a third party purchase price list.
          In other words, you get to fix the price for the
          cards you sell. The same is true for the cards you buy.
        </>,
        <>
          Magic Find's philosophy revolves around the belief that by cutting
          through intermediaries, you get to pay less for the cards you buy, and
          you get more dollars for the ones you sell.
        </>
      ]
    },
    {
      header: 'How it works',
      paragraphs: [
        <>
          First of all, you need to <Link to={'/signup'} >create your account</Link> and sign into it.
          At that point, you will be redirected to your own personnal virtual store.
        </>,
        <>
          This is where you can add the cards you wish to sell, any card from the 10 000 + Magic the Gathering catalog.
          All you have to do is enter the name of the card in the search field and Magic Find will
          retrieve all the existing versions of that card.
          The search field has an auto complete feature. If you only remember part of a name's card, Magic Find
          will suggest possible results that you can choose from.
          You can also update the information in your store.
        </>,
        <>
          As a member, you get the possibility to buy cards from other members of the community.
          Your Magic Find account also gives you access to an internal mail service with your own personal inbox.
          The Magic Find catalog is accessible anytime to anyone. But only members can buy, sell
          and communicate with other members.
        </>
      ]
    },
    {
      header: 'Parts & Labour',
      paragraphs: [
        <>
          Magic Find is a <strong>REST api</strong> with complete <strong>CRUD</strong> operations.
          This gives members the power to add, update or delete the content of their virtual store.
          The same is true for their mailbox.
        </>,
        <>
          The Front End is built with <strong>React</strong>. It uses hooks and contexts to maintain
          and manage components state. All features are fully <strong>responsive</strong>.
        </>,
        <>
          The Back End is built with
          <strong>
            <Link href="https://expressjs.com/" target="_blank" title="Express website">
              Express
            </Link>
          </strong>
          . Requests are made to a no SQL <strong>mongoDB Atlas</strong> data base.
          Populating a store is made through a series of requests to the <Link href="https://scryfall.com/docs/api" target="_blank" title="scryfall api docs"><strong>scryfall api</strong></Link>.
        </>
      ]
    },

  ]
  return (
    <Page
      name={'about'}
      text={'About Magic Find'}
    >
      <main className='bg-eclipse border-surface-1 b-radius-5 grid-section'>
        {
          sections.map((section, i) => {
            return (
              <section key={i} className=''>
                <div>
                  <h2 className='fw-500'>{section.header}</h2>
                </div>
                {
                  section.paragraphs.map((paragraph, i) => {
                    return <p key={i} className='fw-400'>{paragraph}</p>
                  })
                }
              </section>
            )
          })
        }
      </main>
    </Page>
  )
};

export default About;
