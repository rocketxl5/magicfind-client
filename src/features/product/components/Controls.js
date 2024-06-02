import Button from '../../../components/Button';

const Controls = ({ buttons }) => {
    return (
        <div className='controls'>
            {/* <div className="controls-inner"> */}
            {
                buttons?.map(button => {
                    const { id, classList, title, value, clickHandler, ref } = button;
                    return (
                        <Button
                            classList={classList}
                            id={id}
                            title={title}
                            handleClick={clickHandler}
                            ref={ref}
                        >
                            {value}
                        </Button>
                    )
                })
            }
            {/* </div> */}
        </div>
    )
}

export default Controls
