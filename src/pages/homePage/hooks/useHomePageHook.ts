import { useNavigate } from "react-router-dom";

export function useHomePageHook() {
  const navigate = useNavigate();

  function viewDetails(id: string | number): void {
    navigate(`/product/${id}`);
  }

  return {
    viewDetails,
  };
}