import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";

import { EuclideanContent } from "~/content/topics/euclidean";
import { ProcedureView } from "~/components/visualization/procedure_view";
import { SequenceView } from "~/components/visualization/sequence_view";
import { FibonacciContent } from "~/content/topics/fibonacci";
import { PalindromeContent } from "~/content/topics/palindrome";
import { LandingPage } from "~/pages/landing_page";
import { BuildEuclideanRun } from "~/services/topics/euclidean";
import { BuildPalindromeRun } from "~/services/topics/palindrome";
import { TopicPage } from "~/pages/topic_page";
import { BuildFibonacciRun } from "~/services/topics/fibonacci";

afterEach(() => {
  vi.useRealTimers();
});

describe("page components", () => {
  it("renders the landing page with all topic cards", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Seven Topics")).toBeInTheDocument();
    expect(screen.getByTestId("landing-card-fibonacci")).toBeInTheDocument();
    expect(screen.getByTestId("landing-card-lucas-numbers")).toBeInTheDocument();
    expect(screen.queryByText(/^Recursive$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Variant$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Generalized$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Procedure$/)).not.toBeInTheDocument();
    expect(
      screen.getByText(/FINAL PROJECT - Automata Theory and Formal Languages/i),
    ).toBeInTheDocument();
    expect(screen.getByText("References")).toBeInTheDocument();
    expect(
      screen.getByText(/Britannica Editors\. \(2026, March 10\)\. Euclidean algorithm\./i),
    ).toBeInTheDocument();
  });

  it("shows a validation message when Fibonacci input is invalid", async () => {
    const User = userEvent.setup();

    render(
      <MemoryRouter>
        <TopicPage Content={FibonacciContent} />
      </MemoryRouter>,
    );

    const Input = screen.getByTestId("input-TermCount");
    await User.clear(Input);
    await User.click(screen.getByTestId("compute-button"));

    expect(screen.getByTestId("validation-message")).toHaveTextContent(
      "Enter number of terms.",
    );
    expect(screen.queryByText(/01\s*-\s*Recursive/i)).not.toBeInTheDocument();
  });

  it("keeps wide sequence values separated and comma-formatted", () => {
    const RunModel = BuildFibonacciRun(25);

    render(
      <SequenceView
        ActiveSourceIndices={[]}
        ActiveSourceTone={null}
        AnimateDependencies={false}
        CurrentStatus=""
        OnSkip={() => {}}
        RunModel={RunModel}
        ShowFinalValue={false}
        ShowSkipButton={false}
        VisibleDependencyIds={[]}
        VisibleSequenceIndices={RunModel.Items.map((_, Index) => Index)}
      />,
    );

    expect(screen.getByText("46,368")).toBeInTheDocument();
    expect(screen.getAllByTestId("sequence-item-divider")).not.toHaveLength(0);
  });

  it("renders the palindrome input as text with the updated length rules", () => {
    render(
      <MemoryRouter>
        <TopicPage Content={PalindromeContent} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("input-Candidate")).toHaveAttribute("type", "text");
    expect(screen.getByTestId("input-Candidate")).toHaveAttribute("maxlength", "1000");
    expect(screen.getByTestId("input-Candidate")).toHaveAttribute("minlength", "0");
  });

  it("marks single-input and two-input topic forms for the shared layout rules", () => {
    const FibonacciPage = render(
      <MemoryRouter>
        <TopicPage Content={FibonacciContent} />
      </MemoryRouter>,
    );

    expect(FibonacciPage.container.querySelector(".compute-form")).toHaveAttribute(
      "data-field-count",
      "1",
    );

    const EuclideanPage = render(
      <MemoryRouter>
        <TopicPage Content={EuclideanContent} />
      </MemoryRouter>,
    );

    expect(EuclideanPage.container.querySelector(".compute-form")).toHaveAttribute(
      "data-field-count",
      "2",
    );
  });

  it("renders scholarly citations on topic pages without the landing references block", () => {
    render(
      <MemoryRouter>
        <TopicPage Content={FibonacciContent} />
      </MemoryRouter>,
    );

    expect(
      screen.getAllByText(/\(Chandra & Weisstein, n\.d\.\)/i),
    ).not.toHaveLength(0);
    expect(screen.queryByText("References")).not.toBeInTheDocument();
  });

  it("renders Euclidean guidance that ties repeated division to gcd and lcm", () => {
    render(
      <MemoryRouter>
        <TopicPage Content={EuclideanContent} />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/previous divisor becomes the next dividend/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Last nonzero remainder = GCD/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Use the gcd to compute the least common multiple\./i),
    ).toBeInTheDocument();
  });

  it("renders Euclidean final results as dedicated gcd, lcm, and details blocks", () => {
    render(
      <ProcedureView
        CurrentStatus=""
        OnSkip={() => {}}
        RunModel={BuildEuclideanRun(252, 105)}
        ShowFinalValue
        ShowSkipButton={false}
        VisibleProcedureStepCount={4}
      />,
    );

    const FinalValue = screen.getByTestId("procedure-final-value");

    expect(within(FinalValue).getByText("GCD")).toBeInTheDocument();
    expect(within(FinalValue).getByText("21")).toBeInTheDocument();
    expect(within(FinalValue).getByText("LCM")).toBeInTheDocument();
    expect(within(FinalValue).getByText("1,260")).toBeInTheDocument();
    expect(within(FinalValue).getByText("Details")).toBeInTheDocument();
    expect(
      within(FinalValue).getByText("lcm = (252 x 105) / 21 = 1,260"),
    ).toBeInTheDocument();
  });

  it("renders emphasized palindrome comparison letters and mismatch guidance", () => {
    render(
      <ProcedureView
        CurrentStatus=""
        OnSkip={() => {}}
        RunModel={BuildPalindromeRun("racetar")}
        ShowFinalValue={false}
        ShowSkipButton={false}
        VisibleProcedureStepCount={3}
      />,
    );

    const FocusCharacters = screen.getAllByText(/^[crta]$/i);
    const MismatchCharacters = FocusCharacters.slice(-2);

    expect(MismatchCharacters[0]).toHaveTextContent("c");
    expect(MismatchCharacters[0]).toHaveClass("procedure-step-copy-focus");
    expect(MismatchCharacters[1]).toHaveTextContent("t");
    expect(MismatchCharacters[1]).toHaveClass("procedure-step-copy-focus");
    expect(
      screen.getByText(/process stops and the candidate is not a palindrome/i),
    ).toBeInTheDocument();
  });

  it("keeps the uppercase palindrome mismatch step visible after the animated run completes", () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter>
        <TopicPage Content={PalindromeContent} />
      </MemoryRouter>,
    );

    act(() => {
      fireEvent.change(screen.getByTestId("input-Candidate"), {
        target: { value: "Racetar" },
      });
      fireEvent.click(screen.getByTestId("compute-button"));
      vi.advanceTimersByTime(4_000);
    });

    expect(screen.getByText("Compare positions 3 and 5")).toBeInTheDocument();
    expect(
      screen.getByText(/process stops and the candidate is not a palindrome/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Stop at the mismatch")).toBeInTheDocument();
    expect(
      screen.getByText(/mirrored comparison fails here/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Compared as: r a c e t a r. First mismatch: c != t at positions 3 and 5."),
    ).toBeInTheDocument();
  });
});
