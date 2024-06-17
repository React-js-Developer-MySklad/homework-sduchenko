import {render} from "@testing-library/react";
import {screen} from "@testing-library/dom";
import {Footer} from "./footer";

describe("Footer", () => {
    it("should render", async () => {
        render(<Footer/>);
        expect(await screen.findByRole('footer')).toBeInTheDocument();
    })
})