import {
  Auth,
  AuthProvider,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { app } from "../config/app";
import {
  MonitorarAut,
  PararMonitoramentoAut,
  ProvedorAutenticacao,
  Usuario,
} from "core";
import { UsuarioDTO } from "adapters";

export default class FirebaseAuthProvider implements ProvedorAutenticacao {
  private auth: Auth;
  private provedores = [
    { id: "google.com", fn: () => new GoogleAuthProvider() },
    { id: "facebook.com", fn: () => new FacebookAuthProvider() },
    { id: "yahoo.com", fn: () => new OAuthProvider("yahoo.com") },
  ];

  constructor() {
    this.auth = getAuth(app);
  }

  async loginComProvedor(providerId: string): Promise<Usuario | null> {
    const provider: AuthProvider | null =
      this.provedores.find((p) => p.id === providerId)?.fn() ?? null;

    if (!provider) return null;
    const credentials = await signInWithPopup(this.auth, provider);

    return this._normalizedUser(credentials?.user);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  monitorar(fn: MonitorarAut): PararMonitoramentoAut {
    return onIdTokenChanged(this.auth, async (user) => {
      if (!user) return fn(null);
      fn(await this._normalizedUser(user));
    });
  }

  private async _normalizedUser(firebaseUser: User): Promise<Usuario> {
    const alternativeName = firebaseUser.email!.split("@")[0];
    const dto = {
      id: firebaseUser.uid,
      nome: firebaseUser.displayName ?? alternativeName,
      email: firebaseUser.email,
      imagemUrl: firebaseUser.photoURL,
      provider: firebaseUser.providerData[0]!.providerId,
    } as UsuarioDTO;

    const criarUsuario = Usuario.novo(dto);
    if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado();
    return criarUsuario.instancia;
  }
}
