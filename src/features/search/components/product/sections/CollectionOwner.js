import React from 'react'
import data from '../../../../../data/SEARCH.json';
import timestampConverter from '../../../../../assets/utilities/timestampConverter';

const CollectionOwner = ({ product }) => {
    const { conditions, languages, finishes } = data.product;
    const { longDate } = timestampConverter;
    return (
        <div className="collection-owner border-danger">
            {product._is_published ?
                (

                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Status: </td>
                                <td>Published</td>
                            </tr>
                            <tr>
                                <td>Published On: </td>
                                <td>{longDate(product._date_published)}</td>
                            </tr>
                            <tr>
                                <td>Condition: </td>
                                <td>{conditions[product._condition]}</td>
                            </tr>
                            <tr>
                                <td>Language: </td>
                                <td>{languages[product._language]}</td>
                            </tr>
                            <tr>
                                <td>Price: </td>
                                <td>{product._price}</td>
                            </tr>
                            <tr>
                                <td>Quantity: </td>
                                <td>{product._quantity}</td>
                            </tr>
                            <tr>
                                <td>Finish: </td>
                                <td>{finishes[product.finishes]}</td>
                            </tr>

                        </tbody>
                    </table>
                ) : (
                    <p>Card is Unpublished</p>
                )
            }
        </div>
    )
}

export default CollectionOwner
