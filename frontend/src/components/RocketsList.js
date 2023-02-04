import { Link } from 'react-router-dom';

import classes from './RocketsList.module.css';

function RocketsList({rockets, edit}) {
  return (
    <div className={classes.events}>
      <h1>All Rockets</h1>
      <ul className={classes.list}>
        {rockets.map((rocket) => (
          <li key={rocket.id} className={classes.item}>
            <Link to={`/rockets/${rocket.id}?edit=${edit}`}>
              <img src={rocket.image} alt={rocket.title} />
              <div className={classes.content}>
                <h2>{rocket.title}</h2>
                <time>{rocket.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RocketsList;
