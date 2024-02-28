import { forwardRef } from 'react'

const Div = forwardRef(function Div({ children, classList }, ref) {
    return (
        <div className={classList} ref={ref}>
            {children}
        </div>
    )
}
)
export default Div
