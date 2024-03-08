import { forwardRef, useRef, useEffect } from 'react'
import { FiPlus } from "react-icons/fi";
import useScroll from '../../../hooks/contexthooks/useScroll';

const SearchParameters = forwardRef(function SearchParameters(props, ref) {
    const { setSearchFeatures, searchFeatures } = props;
    const iconRef = useRef(null);
    const panelRef = useRef(null);
    const { btnRef } = useScroll();

    useEffect(() => {
        //     if (searchFeatures) {
        //         document.body.classList.add('scroll-none');
        //         panelRef.current?.classList.add('move-panel');
        //         btnRef.current?.classList.add('move-btn');
        //         iconRef.current?.classList.add('rotate-icon');
        //     } else {
        //         document.body.classList.remove('scroll-none');
        //         panelRef.current?.classList.remove('move-panel');
        //         btnRef.current?.classList.remove('move-btn');
        //         iconRef.current?.classList.remove('rotate-icon');
        //     }
    }, [searchFeatures]);

    return (
        <aside className="parameters" >
            <header className="parameters-header">
                <h3>Search Parameters</h3>
            </header>
            <div className="parameters-container">
                <ul className="parameters-list" ref={panelRef}>
                    {

                        // data.parameters.map((parameter, i) => {
                        //     return <Parameter key={i} parameter={parameter} />
                        // })
                    }
                </ul>

                <button className="parameters-btn" type="button" onClick={() => setSearchFeatures(!searchFeatures)} ref={btnRef}><span className="parameters-icon" ref={iconRef}><FiPlus /></span></button>
            </div>
        </aside>
    )
})

export default SearchParameters
