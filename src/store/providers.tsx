"use client"; // This is required for Redux in Next.js App Router

import { Provider } from "react-redux";
import { store } from "./store";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
