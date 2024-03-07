import { passport } from "../controllers/authenticationControllers";

const authentication = () => {
  return passport.authenticate("jwt", { session: false });
};

export default authentication;
