import { useMyGarage } from './useMyGarage';
import MyGarageView from './MyGarageView';

function MyGarage() {
  const garageState = useMyGarage();
  return <MyGarageView {...garageState} />;
}

export default MyGarage;
