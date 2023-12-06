import React from 'react';
import { useLocation } from 'react-router-dom';

const PublishCard = () => {
    const location = useLocation();
    const { card } = location.state;

    console.log(card)
    return (
        <div className="content">
            <header className="header">

                <h2 className="title">Publish Card</h2>
            </header>
            <main className="main">
            </main>
        </div>
    )
}

export default PublishCard
