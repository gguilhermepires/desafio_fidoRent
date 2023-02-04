import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
  useSearchParams,
} from 'react-router-dom';

import RocketItem from '../components/RocketItem';
import RocketsList from '../components/RocketsList';
import {getAuthToken} from '../util/auth';

function RocketDetailPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rocket, rockets } = useRouteLoaderData('rocket-detail');
  const edit = searchParams.get('edit');
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={rocket}>
          {(loadedRocket) => <RocketItem rocket={loadedRocket} edit={edit}/>}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={rockets}>
          {(loadedEvents) => <RocketsList rockets={loadedEvents} edit={true} />}
        </Await>
      </Suspense>
    </>
  );
}

export default RocketDetailPage;

async function loadRocket(id) {
  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadRockets() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.rocketId;
  return defer({
    rocket: await loadRocket(id),
    rockets: loadRockets(),
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const token = getAuthToken();
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
    headers: {
      'Authorization': 'Bearer '+ token
    }
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete event.' },
      {
        status: 500,
      }
    );
  }
  return redirect('/events');
}
