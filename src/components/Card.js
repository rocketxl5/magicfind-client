import ListItem from './ListItem';
import { GoShieldCheck } from "react-icons/go";

const Card = ({ item, type }) => {
    return (
        <div className={`card ${type}`}>
            {
                type === 'feature-card' ?
                    <>
                        <div
                            style={{ backgroundImage: `url(${item.bgLink})` }}
                            className="feature-card-image">
                        </div>
                        <div className="flex column gap-1 padding-1 b-radius-5 feature-border">

                            <h2 className="feature-card-title">{item.title}</h2>

                            <ul className="feature-list">
                                {
                                    item.body.map((text, i) => {
                                        return (
                                            <ListItem
                                                key={i}
                                                text={text}
                                                bullet={<span className='bullet'><GoShieldCheck strokeWidth={'1px'} /></span>}
                                            />
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </> : ''

            }


        </div>
    )
}

export default Card
