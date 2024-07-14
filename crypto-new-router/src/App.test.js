import { render, screen } from "@testing-library/react";
import App from "./App";

test("render", async () => {
	render(<App />);
	const linkElement = screen.getByText(/CryptoBucks/i);
	expect(linkElement).toBeInTheDocument();
})