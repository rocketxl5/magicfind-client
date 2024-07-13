import { NavLink } from 'react-router-dom'

const ListItem = ({ bullet, classList, id, link, text }) => {
// If list of links
    return (
        link ?
            <li
                id={id}
                className={`list-item`}
            >
                <NavLink
                    {...link}
                >
                    {text}
                </NavLink>
            </li> :

            <li
                id={id}
                className={`list-item ${classList}`}
            >

                {
                    bullet && bullet
                }

                <span className='text'>
                    {text}
                </span>

        </li>
    )
}

export default ListItem