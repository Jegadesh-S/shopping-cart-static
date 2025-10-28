import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { describe, test, expect, vi } from "vitest";
import eeShoppingCartStore from "../../src/app/mainLayoutStore";
import MainLayout from "@layouts/mainLayout";

// Mock the Header component
vi.mock("@components/header", () => ({
  default: () => <div data-testid="header">Mock Header</div>,
}));

describe("MainLayout Component", () => {
  const renderWithProviders = (ui) => {
    return render(
      <Provider store={eeShoppingCartStore}>
        <MemoryRouter initialEntries={["/"]}>{ui}</MemoryRouter>
      </Provider>
    );
  };

  test("renders Header component inside Provider", () => {
    renderWithProviders(<MainLayout />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  test("renders Outlet placeholder when no child route provided", () => {
    renderWithProviders(<MainLayout />);
    const outletContainer = screen.getByTestId("dynamic-content");
    expect(outletContainer).toBeInTheDocument();
  });

  test("renders container with correct class name", () => {
    renderWithProviders(<MainLayout />);
    const container = document.querySelector(".main-layout-container");
    expect(container).toBeInTheDocument();
  });

  test("renders child route content using Outlet", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={<div data-testid="child-route">Child Route</div>}
          />
        </Route>
      </Routes>
    );
    expect(screen.getByTestId("child-route")).toBeInTheDocument();
  });

  test("wraps everything inside Redux Provider", () => {
    const { container } = renderWithProviders(<MainLayout />);
    expect(container).toBeTruthy();
  });
});
