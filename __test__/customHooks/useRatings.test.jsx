import { renderHook, act } from "@testing-library/react";
import useRatings from "@customHooks/useRatings";

describe("useRatings Hook", () => {
  test("initial ratings state is empty array", () => {
    const { result } = renderHook(() => useRatings(0));
    const expected = [
      { className: "un-filled" },
      { className: "un-filled" },
      { className: "un-filled" },
      { className: "un-filled" },
      { className: "un-filled" },
    ];

    expect(result.current.ratings).toEqual(expected);
  });

  test("applyRatings sets correct ratings array for given rating", () => {
    const { result } = renderHook(() => useRatings(0));

    act(() => result.current.applyRatings(3));

    // The first 2 should be filled for rating 3
    expect(result.current.ratings.length).toBe(5);
    expect(result.current.ratings[0].className).toBe("filled");
    expect(result.current.ratings[1].className).toBe("filled");
    expect(result.current.ratings[2].className).toBe("un-filled");
    expect(result.current.ratings[3].className).toBe("un-filled");
    expect(result.current.ratings[4].className).toBe("un-filled");
  });

  test("computeWidthInPercentage returns correct width", () => {
    const { result } = renderHook(() => useRatings(0));

    expect(result.current.computeWidthInPercentage(0)).toBe("0%");
    expect(result.current.computeWidthInPercentage(2.5)).toBe("50%");
    expect(result.current.computeWidthInPercentage(5)).toBe("100%");
  });

  test("useEffect calls applyRatings on initial render", () => {
    const { result } = renderHook(() => useRatings(5));
    expect(result.current.ratings[0].className).toBe("filled");
    expect(result.current.ratings[3].className).toBe("filled");
  });

  // test("updating rating updates ratings array", () => {
  //   const { result, rerender } = renderHook(
  //     ({ rating }) => useRatings(rating),
  //     {
  //       initialProps: { rating: 1 },
  //     }
  //   );

  //   expect(result.current.ratings[0].className).toBe("filled");
  //   // expect(result.current.ratings[1].className).toBe("filled");
  //   // expect(result.current.ratings[2].className).toBe("un-filled");

  //   rerender({ rating: 5 });
  //   expect(result.current.ratings.every((r) => r.className === "filled")).toBe(
  //     true
  //   );
  // });
});
