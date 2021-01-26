// import { TRoutesInput } from '../types/routes';
// import UserController from '../controllers/user.controller';
// import PetController from '../controllers/pet.controller';

export default ({ app }) => {
  app.post('/api/user', async (req, res) => {

    return res.send({hoge:'huga'});
  });
};