export type ComponentState = "default" | "loading" | "unauthorized" | "empty";
export const getState = (state: string): ComponentState => {
  switch (state) {
    case "Loading":
      return "loading";
    case "Empty":
      return "empty";
    case "Not Authorized":
      return "unauthorized";
    default:
      return "default";
  }
};
