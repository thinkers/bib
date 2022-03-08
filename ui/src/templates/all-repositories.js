import React from 'react';
import { Link } from 'gatsby';
import '../styles/fonts.css';
import '../styles/global.css';
import '../styles/tablet_m.css';
import '../styles/desktop_l.css';
import '../styles/desktop_xl.css';

export default ({ pageContext: { repositories } }) => (

    <div className="content">
        <h1 className="title">Magazines</h1>
        {
            repositories.map(magazine => (

                <Link to={`/magazine/${magazine._title}`}>
                    <div>{magazine._title}</div>
                </Link>
            ))
        }
    </div>
);
