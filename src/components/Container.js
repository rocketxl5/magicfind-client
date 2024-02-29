import { forwardRef } from 'react'

const Container = forwardRef(function Container({ children, classList }, ref) {
    console.log(classList)
    return (
        <div className={classList} ref={ref}>
            {children}
        </div>
    )
})

export default Container
