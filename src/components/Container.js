import { forwardRef } from 'react'

const Container = forwardRef(function Container({ children, id, classList }, ref) {
    return (
        <div id={id} className={classList} ref={ref}>
            {children}
        </div>
    )
})

export default Container
