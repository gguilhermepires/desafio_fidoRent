import { useRouteLoaderData } from 'react-router-dom';

import RocketForm from '../components/RocketForm';

function EditRocketPage() {
  const data = useRouteLoaderData('rocket-detail');
  return <RocketForm method="patch" rocket={data.rocket} />;
}

export default EditRocketPage;
