import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { EuclideanContent } from "~/content/topics/euclidean";
import { SequenceView } from "~/components/visualization/sequence_view";
import { FibonacciContent } from "~/content/topics/fibonacci";
import { PalindromeContent } from "~/content/topics/palindrome";
import { LandingPage } from "~/pages/landing_page";
import { TopicPage } from "~/pages/topic_page";
import { BuildFibonacciRun } from "~/services/topics/fibonacci";

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
});
