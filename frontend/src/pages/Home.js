import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
  useLoaderData
} from 'react-router-dom';

import PageContent from '../components/PageContent';
import RocketsList from '../components/RocketsList';

function HomePage() {
  const { rockets } = useLoaderData();

  return (
    <PageContent title="Welcome!">
      <p>Browse all our amazing events!</p>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={rockets}>
          {(loadedEvents) => <RocketsList rockets={loadedEvents} edit={false} />}
        </Await>
      </Suspense>
    </PageContent>
  );
}

export default HomePage;
