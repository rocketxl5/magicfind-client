import { forwardRef } from 'react'

const SidePanel = forwardRef(function SidePanel({ children }, ref) {

    return (
        <div className="side-panel" onClick={() => ref?.current.classList.toggle('side-show')} ref={ref}>
            {children}
        </div>
    )
})

export default SidePanel
