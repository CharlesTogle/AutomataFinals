type TopicActionsProps = {
  IsAnimating: boolean;
};

export function TopicActions({ IsAnimating }: TopicActionsProps) {
  return (
    <div className="topic-actions">
      <button
        className="btn btn-primary"
        data-testid="compute-button"
        type="submit"
      >
        {IsAnimating ? "Recompute" : "Compute"}
      </button>
      <button
        className="btn btn-secondary"
        data-testid="reset-button"
        type="reset"
      >
        Reset
      </button>
    </div>
  );
}
