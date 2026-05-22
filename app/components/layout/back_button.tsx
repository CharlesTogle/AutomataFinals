import { Link } from "react-router";

type BackButtonProps = {
  Label: string;
};

export function BackButton({ Label }: BackButtonProps) {
  return (
    <Link className="page-hero-back" to="/">
      &larr; {Label}
    </Link>
  );
}
