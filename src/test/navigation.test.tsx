import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "@/components/Navbar";
import GallerySection from "@/components/GallerySection";

describe("Gallery anchor navigation", () => {
  it("renders the Gallery navbar link with the correct /#gallery href", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const galleryLink = screen.getByRole("link", { name: /gallery/i });

    expect(galleryLink).toHaveAttribute("href", "/#gallery");
  });

  it("renders the gallery section with the gallery id", () => {
    render(<GallerySection />);

    const gallerySection = screen.getByRole("heading", { name: /project gallery/i });

    expect(gallerySection.closest("section")).toHaveAttribute("id", "gallery");
  });
});
