type SkipButtonProps = {
  IsVisible: boolean;
  OnSkip: () => void;
};

export function SkipButton({ IsVisible, OnSkip }: SkipButtonProps) {
  if (!IsVisible) {
    return null;
  }

  return (
    <button
      className="btn btn-secondary"
      data-testid="skip-button"
      onClick={OnSkip}
      type="button"
    >
      Skip animation
    </button>
  );
}
