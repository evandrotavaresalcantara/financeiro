import { CoreFacade } from "adapters";
import FirestoreProvider from "./db/FirestoreProvider";
import FirebaseAuthProvider from "./auth/FirebaseAuthProvider";
import AutenticacaoFacade from "adapters/src/facade/AutenticacaoFacade";

const core = new CoreFacade(
  new FirestoreProvider(),
  new FirebaseAuthProvider(),
);

export { core };
