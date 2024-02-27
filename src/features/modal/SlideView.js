import React from 'react'
import CloseBtn from './buttons/CloseBtn';
import SingleFaceCard from './SingleFaceCard';
import DoubleFaceCard from './DoubleFaceCard';

const SlideView = ({ children, handleClick }) => {
    console.log(children)
    return (
        <div className="slide-view">
            <div className="slide-frame">
                <CloseBtn style={`slide-close-btn close-btn card-btn`} name={'close-btn'} handleClick={handleClick} />
            </div>
            <div className="slide">
                {
                    //  const action = !children.length ? children.props.action : children[0].props.action;
                    //  if (['static', 'flip', 'rotate'].includes(action)) {
                    //      return (
                    //          <SingleFaceCard key={i} action={action}>
                    //              <>{children}</>
                    //          </SingleFaceCard>
                    //      );
                    //  }
                    //  else {
                    //      return (
                    //          <DoubleFaceCard key={i} action={action}>
                    //              <>{children}</>
                    //          </DoubleFaceCard>
                    //      );
                    //  }
                }
            </div>
        </div>
    )
}

export default SlideView
