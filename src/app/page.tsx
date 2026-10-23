import { Button } from "@/shared/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button>
        <Link href={"/login"}>Login</Link>
      </Button>
      <Button>
        <Link href={"/upload"}>Upload</Link>
      </Button>
      <Button>
        <Link href={"/profile"}>Profile</Link>
      </Button>
    </div>
  );
}
