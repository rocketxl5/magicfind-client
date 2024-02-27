import { forwardRef } from 'react'

const Div = forwardRef(function Div({ children, className }, ref) {
    return (
        <div className={className} ref={ref}>
            {children}
        </div>
    )
}
)
export default Div
