import Card from '../components/Card';

const List = (props) => {
    const { listType, itemType, items } = props;
    return (

        listType === 'card-list' ?
            <div className='grid-list'>
                {
                    items.map((item, i) => {
                        return <Card
                            item={item}
                            type={itemType}
                        />
                    })
                }
            </div> : ''

    )
}

export default List
