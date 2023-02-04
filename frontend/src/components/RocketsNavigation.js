import { NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './RocketsNavigation.module.css';

function RocketsNavigation() {
  const token = useRouteLoaderData('root');
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/rockets"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Rockets
            </NavLink>
          </li>
          { token && 
           <li>
           <NavLink
             to="/rockets/new"
             className={({ isActive }) =>
               isActive ? classes.active : undefined
             }
           >
             New Event
           </NavLink>
         </li>
          }
         
        </ul>
      </nav>
    </header>
  );
}

export default RocketsNavigation;
