import { ReactChild, ReactFragment, ReactPortal, Dispatch, SetStateAction } from "react";

export type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
export type Dispatcher<S> = Dispatch<SetStateAction<S>>;
