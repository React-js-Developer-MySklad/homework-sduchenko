import {render} from "@testing-library/react";
import {screen} from "@testing-library/dom";
import {Header} from "./header";

describe("Header", () => {
    it("should render", async () => {
        render(<Header/>);
        expect(await screen.findByRole('add-button')).toBeInTheDocument();
        expect(await screen.findByRole('logo')).toBeInTheDocument();
    })
})