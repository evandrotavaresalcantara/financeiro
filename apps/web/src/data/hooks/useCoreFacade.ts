"use client";
import { useMemo } from "react";
import FirebaseAuthProvider from "@/adapters/auth/FirebaseAuthProvider";
import useApi from "./useApi";
import ApiStoreProvider from "@/adapters/db/ApiStoreProvider";
import { CoreFacade } from "adapters";

export default function useCoreFacade() {
  const api = useApi();

  const core2 = useMemo(() => {
    const useApiStore = new ApiStoreProvider(api);
    const auth = new FirebaseAuthProvider();
    return new CoreFacade(useApiStore, auth);
  }, [api]);

  return core2;
}
