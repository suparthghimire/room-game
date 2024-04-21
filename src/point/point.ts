import type p5 from "p5";
import { config } from "../config";
import type { T_Color } from "../@types";

export class Point {
	private fill: T_Color = config.deselected_color;
	private checked = false;
	constructor(
		private i: number,
		private j: number,
		private x: number,
		private y: number,
		private radius: number,
	) {}

	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}

	isPointInside(p: p5, x: number, y: number) {
		const transformedX = x - config.canvas_transform_x;
		const transformedY = y - config.canvas_transform_y;

		const distance = p.dist(this.x, this.y, transformedX, transformedY);
		return distance < this.radius;
	}

	fillPoint() {
		// if black change to white, if white change to black
		if (this.checked) {
			this.fill = config.selected_color;
		} else {
			this.fill = config.deselected_color;
		}
	}

	toggleChecked() {
		this.checked = !this.checked;
	}

	drawPoint(p: p5) {
		// add text

		p.fill(this.fill.r, this.fill.g, this.fill.b, this.fill.a);
		p.stroke(255);
		p.circle(this.x, this.y, this.radius);

		p.textSize(config.text_size);
		p.fill("orange");
		p.noStroke();
		// set text color to green
		p.text(`${this.i}, ${this.j}`, this.x, this.y);
		p.textAlign(p.CENTER, p.CENTER);
	}

	onClick(p: p5, x: number, y: number) {
		const isInside = this.isPointInside(p, x, y);
		if (isInside) {
			// fill only that point
			this.toggleChecked();
			this.fillPoint();
		}
	}

	onHover(p: p5, x: number, y: number) {
		const isInside = this.isPointInside(p, x, y);
		// if selected, do nothing
		if (this.checked) {
			return;
		}
		if (isInside) {
			this.fill = config.hover_color;
		} else {
			this.fill = config.deselected_color;
		}
	}

	get() {
		return this;
	}
}
