type VoyagerOptions = {
	selector?: string;
	activeClass?: string;
	rootMarginTop?: string;
	rootMarginBottom?: string;
	threshold?: number;
};

class Voyager {
	private selector: string;
	private activeClass: string;
	private rootMarginTop: string;
	private rootMarginBottom: string;
	private threshold: number;
	private observer: IntersectionObserver | null = null;
	private _links: NodeListOf<HTMLAnchorElement> | null = null;

	constructor({ selector = "[data-voyager]", activeClass = "active", rootMarginTop = "0px", rootMarginBottom = "0px", threshold = 0.1 }: VoyagerOptions = {}) {
		this.selector = selector;
		this.activeClass = activeClass;
		this.rootMarginTop = rootMarginTop;
		this.rootMarginBottom = rootMarginBottom;
		this.threshold = threshold;

		this.refresh();
	}

	/**
	 * Refresh the intersection observer and re-initialize it.
	 */
	public refresh(): void {
		this._links = document.querySelectorAll(`${this.selector} a`);

		if ("IntersectionObserver" in window && this._links.length > 0) {
			this.observer = new IntersectionObserver(this._handleIntersect.bind(this), {
				rootMargin: `${this.rootMarginTop} 0px ${this.rootMarginBottom} 0px`,
				threshold: this.threshold,
			});

			this._links.forEach((link) => {
				link.addEventListener("click", (event) => {
					event.preventDefault();
					const targetId = link.getAttribute("href")!;
					const targetElement = document.querySelector(targetId);
					targetElement?.scrollIntoView({ behavior: "smooth" });
				});

				const target = document.querySelector(link.hash) as Element | null;
				if (target) {
					this.observer?.observe(target);
				}
			});
		}
	}

	/**
	 * Handles the intersection of observed elements.
	 */
	private _handleIntersect(entries: IntersectionObserverEntry[]): void {
		entries.forEach((entry) => {
			const id = `#${entry.target.getAttribute("id")}`;
			const anchor = document.querySelector(`[href="${id}"]`) as HTMLAnchorElement | null;

			if (entry.isIntersecting) {
				document.querySelectorAll(`.${this.activeClass}`).forEach((el) => el.classList.remove(this.activeClass));
				anchor?.classList.add(this.activeClass);
			}
		});
	}

	/**
	 * Destroys the observer and clears properties.
	 */
	public destroy(): void {
		if (this.observer) {
			this.observer.disconnect();
			this.observer = null;
		}
		this._links = null;
	}
}

export default Voyager;
