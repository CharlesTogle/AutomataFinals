import { SequenceTiming } from "~/global/constants";
import type {
  LegendTone,
  SequenceDependencyModel,
  SequenceRunModel,
} from "~/services/visualization/types";

import { SkipButton } from "./skip_button";

const BaseItemWidth = 76;
const ArcY = 6;
const CharacterWidth = 14;
const ItemPaddingWidth = 20;
const WideValueThreshold = 5;
const ArcDepthByTone: Record<LegendTone, number> = {
  far: 72,
  mid: 52,
  near: 34,
  single: 34,
  even: 34,
  odd: 34,
};
const SvgHeight = 84;

type SequenceViewProps = {
  RunModel: SequenceRunModel;
  CurrentStatus: string;
  ShowSkipButton: boolean;
  ShowFinalValue: boolean;
  VisibleSequenceIndices: number[];
  VisibleDependencyIds: string[];
  ActiveSourceIndices: number[];
  ActiveSourceTone: LegendTone | null;
  AnimateDependencies: boolean;
  OnSkip: () => void;
};

function GetItemWidth(RunModel: SequenceRunModel): number {
  const LongestValueLength = Math.max(
    ...RunModel.Items.map((Item) => Item.Value.length),
    0,
  );

  return Math.max(
    BaseItemWidth,
    LongestValueLength * CharacterWidth + ItemPaddingWidth,
  );
}

function BuildArcPath(
  Dependency: SequenceDependencyModel,
  ItemWidth: number,
): string {
  const StartX = Dependency.FromIndex * ItemWidth + ItemWidth / 2;
  const EndX = Dependency.ToIndex * ItemWidth + ItemWidth / 2;
  const MidX = (StartX + EndX) / 2;
  const ArcDepth = ArcDepthByTone[Dependency.Tone];

  return `M ${StartX} ${ArcY} Q ${MidX} ${ArcDepth} ${EndX} ${ArcY}`;
}

export function SequenceView({
  RunModel,
  CurrentStatus,
  ShowSkipButton,
  ShowFinalValue,
  VisibleSequenceIndices,
  VisibleDependencyIds,
  ActiveSourceIndices,
  ActiveSourceTone,
  AnimateDependencies,
  OnSkip,
}: SequenceViewProps) {
  const ItemWidth = GetItemWidth(RunModel);
  const ShowValueDividers = RunModel.Items.some(
    (Item) => Item.Value.length >= WideValueThreshold,
  );
  const VisibleDependencies = RunModel.Dependencies.filter((Dependency) =>
    VisibleDependencyIds.includes(Dependency.Id),
  );

  return (
    <section className="viz-wrapper anim-fade-up anim-delay-5" data-testid="sequence-view">
      <p className={`viz-status${ShowSkipButton ? " is-computing" : ""}`}>
        {CurrentStatus}
      </p>
      <div className="viz-container">
        <div className="viz-scroll">
          <div className="viz-numbers">
            {RunModel.Items.map((Item, Index) => {
              const IsVisible = VisibleSequenceIndices.includes(Index);
              const IsSource = ActiveSourceIndices.includes(Index);
              const IsNextVisible = VisibleSequenceIndices.includes(Index + 1);
              const ShowDivider =
                ShowValueDividers &&
                IsVisible &&
                IsNextVisible &&
                Index < RunModel.Items.length - 1;
              const ActiveToneClass =
                IsSource && ActiveSourceTone !== null
                  ? `is-source-${ActiveSourceTone}`
                  : "";
              const ItemClasses = [
                "viz-item",
                IsSource ? "is-source" : "",
                ActiveToneClass,
                Item.IsBase ? "is-base" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div
                  className={ItemClasses}
                  key={`${Item.Notation}-${Index}`}
                  style={{ width: ItemWidth }}
                >
                  <span className={`viz-value${IsVisible ? " visible" : ""}`}>
                    {Item.Value}
                  </span>
                  <span className="viz-idx">{Item.Notation}</span>
                  {ShowDivider ? (
                    <span
                      aria-hidden="true"
                      className="viz-item-divider"
                      data-testid="sequence-item-divider"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
          <svg
            aria-hidden="true"
            className="viz-svg"
            height={SvgHeight}
            width={Math.max(RunModel.Items.length * ItemWidth, ItemWidth)}
          >
            {VisibleDependencies.map((Dependency, Index) => (
              <path
                className={`viz-arc arc-${Dependency.Tone}${AnimateDependencies ? " is-animating" : ""}`}
                d={BuildArcPath(Dependency, ItemWidth)}
                key={`${Dependency.Id}-${Index}`}
                pathLength={1}
                style={{
                  animationDuration: AnimateDependencies
                    ? `${SequenceTiming.ArcDrawMs}ms`
                    : undefined,
                }}
              />
            ))}
          </svg>
        </div>
      </div>
      <div className="viz-footer">
        <div className="viz-legend">
          {RunModel.Legend.map((LegendItem) => (
            <span
              className={`viz-legend-item viz-legend-${LegendItem.Tone}`}
              key={LegendItem.Label}
            >
              {LegendItem.Label}
            </span>
          ))}
        </div>
        <SkipButton IsVisible={ShowSkipButton} OnSkip={OnSkip} />
      </div>
      {ShowFinalValue ? (
        <div className="final-value visible" data-testid="sequence-final-value">
          <p className="final-value-label">{RunModel.FinalValue.Label}</p>
          <div className="final-value-main">
            <span className="final-value-notation">{RunModel.FinalValue.Notation}</span>
            <span className="final-value-number">{RunModel.FinalValue.Number}</span>
          </div>
          {RunModel.FinalValue.SequenceText ? (
            <p className="final-value-seq">{RunModel.FinalValue.SequenceText}</p>
          ) : null}
          {RunModel.FinalValue.DetailText ? (
            <p className="final-value-detail">{RunModel.FinalValue.DetailText}</p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
