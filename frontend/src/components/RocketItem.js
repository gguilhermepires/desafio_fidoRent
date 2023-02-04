import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';

import classes from './RocketItem.module.css';

function RocketItem({ rocket, edit }) {
  const token = useRouteLoaderData('root');
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }
  console.log('linha 15555', edit);
  return (
    <article className={classes.event}>
      <img src={rocket.image} alt={rocket.title} />
      <h1>{rocket.title}</h1>
      <time>{rocket.date}</time>
      <p>{rocket.description}</p>
      {token && <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>}
    </article>
  );
}

export default RocketItem;
