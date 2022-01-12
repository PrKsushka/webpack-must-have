import React from "react";
import { ElementsForLogInLogOut } from "@/types/logInLogOutCommon.types";

export const ContextForLogInLogOut = React.createContext<ElementsForLogInLogOut>({} as ElementsForLogInLogOut);
