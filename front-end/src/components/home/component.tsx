import { auth } from "../../firebase";

export function Home() {
  return (
    <div>
      {JSON.stringify(
        auth.currentUser?.toJSON() ?? "Could not find a logged in user"
      )}
    </div>
  );
}
