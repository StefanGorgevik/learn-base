import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";

import { Header } from ".";

describe("Header component", () => {
  jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useLocation: jest.fn().mockImplementation(() => {
      return { pathname: "/testroute" };
    }),
  }));
  test("renders SearchBar", () => {
    render(
      <Router location={""}>
        <Header />
      </Router>
    ); //Arrange
    const searchBar = screen.getByRole("textbox", { name: "search" }); //Act
    expect(searchBar).toBeInTheDocument(); //Assert
  });
  test("renders Learn Base title", () => {
    render(
      <Router location={""}>
        <Header />
      </Router>
    ); //Arrange
    const title = screen.getByTestId("header-title"); //Act
    expect(title).toBeInTheDocument(); //Assert
  });
});
