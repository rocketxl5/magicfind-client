const Table = ({ classList, title, rows }) => {
    return (
        <div className=''>
            <header>
                <h2 className='text-center fs-150 fw-500'>{title}</h2>
            </header>
            <div className='b-radius-5 border-surface-thin'>
                <table className='product-table'>
                    <tbody>
                        {
                            rows.map((row, i) => {
                                return (
                                    <tr key={i}>
                                        <td className='spec-title col-3'>{row.title}</td>
                                        <td className={`spec-value col-8 ${row.classList ? row.classList : ''}`}>{row.value}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <footer>

            </footer>
        </div>
    )
}

export default Table
