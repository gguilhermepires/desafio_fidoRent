import { Suspense, useState, useEffect} from 'react';
import { useLoaderData, json, defer, Await, redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // import do hook

import RocketsList from '../components/RocketsList';
import Pagination from '../components/Pagination/Pagination';

function RocketsPage(props) {
  const { rockets, page, perPage } = useLoaderData('rocket-get-all');
  const [currentPage, setCurrentPage] = useState(page);
  const navigate = useNavigate();
  
  function onClickPagination(index) {
    setCurrentPage(index + 1);
  }

  useEffect( () => {
    navigate(`?page=${currentPage}&perPage=${perPage}`);
  }, [currentPage]);


  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={rockets}>
        {(loadedEvents) => {
          let totalPage=1;
          if (loadedEvents.totalItems >  perPage) {
            totalPage = Math.ceil(loadedEvents.totalItems / perPage);
          } 
          return <div> 
 <RocketsList rockets={loadedEvents.events} edit={false} />
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              onClick={onClickPagination}
            />
          </div>;
        }
        }
      </Await>
    </Suspense>
  );
}

export default RocketsPage;

async function loadRockets(page, perPage) {
  const response = await fetch('http://localhost:8080/events?page=' + page + '&perPage=' + perPage);
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    console.log('linha 56',resData);
    return resData;
  }
}

export function loader({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get('page') || 1;
  const perPage = searchParams.get('perPage') || 2;
  return defer({
    rockets: loadRockets(page, perPage),
    page,
    perPage,
  });
}
