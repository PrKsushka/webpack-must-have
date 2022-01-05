import { useState } from "react";
import Preloader from "@/components/UI/preloader/preloader";

const usePreloader: () => [JSX.Element | null, () => void, () => void] = () => {
  const [loading, setLoading] = useState(false);
  return [loading ? <Preloader /> : null, () => setLoading(true), () => setLoading(false)];
};
export default usePreloader;
