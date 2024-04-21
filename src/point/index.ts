import { config } from "../config";
import type { T_Color, T_Coord } from "../@types";
import { v4 as uuidv4 } from "uuid";
import { p5Instance } from "../main";
export class Point {
	private id = uuidv4();
	private fill: T_Color = config.deselected_color;
	private checked = false;
	private neighbours: string[] = [];

	constructor(
		private i: number,
		private j: number,
		private x: number,
		private y: number,
		private radius: number,
	) {}
	getId() {
		return this.id;
	}
	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}

	getNeighbours() {
		return this.neighbours;
	}

	isPointInside(x: number, y: number) {
		const transformedX = x - config.canvas_transform_x;
		const transformedY = y - config.canvas_transform_y;
		const distance = p5Instance.dist(
			this.x,
			this.y,
			transformedX,
			transformedY,
		);
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

	getCoords(): T_Coord {
		return {
			x: this.x,
			y: this.y,
		};
	}
	drawPoint() {
		// add text

		p5Instance.fill(this.fill.r, this.fill.g, this.fill.b, this.fill.a);
		p5Instance.stroke(255);
		p5Instance.strokeWeight(2);
		p5Instance.circle(this.x, this.y, this.radius);

		// p5Instance.textSize(config.text_size);
		// p5Instance.fill("orange");
		// p5Instance.noStroke();
		// // set text color to green
		// p5Instance.text(`${this.i}, ${this.j}`, this.x, this.y);
		// p5Instance.textAlign(p5Instance.CENTER, p5Instance.CENTER);
	}

	onClick(x: number, y: number) {
		const isInside = this.isPointInside(x, y);
		if (isInside) {
			// fill only that point
			this.toggleChecked();
			this.fillPoint();
			return true;
		}
		return false;
	}

	onHover(x: number, y: number) {
		const isInside = this.isPointInside(x, y);
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

	setUnchecked() {
		this.checked = false;
		this.fillPoint();
	}

	setNeighbours(points: Point[]) {
		const topJ = this.j - 1;

		const bottomJ = this.j + 1;

		const leftI = this.i - 1;

		const rightI = this.i + 1;

		// check for bounds
		const topjIsOutOfBounds = topJ < 0;
		const bottomjIsOutOfBounds = bottomJ >= config.row_count;

		const leftiIsOutOfBounds = leftI < 0;
		const rightiIsOutOfBounds = rightI >= config.column_count;

		for (const point of points) {
			// if it is me, skip
			if (point.getId() === this.getId()) continue;

			// if top j is out of bounds, I am at the top, so no top nbr
			if (!topjIsOutOfBounds && point.j === topJ && point.i === this.i) {
				console.log("TOP IS TRUE");
				this.neighbours.push(point.getId());
			}

			// if bottom j is out of bounds, I am at the bottom, so no bottom nbr
			if (!bottomjIsOutOfBounds && point.j === bottomJ && point.i === this.i) {
				console.log("BOTTOM IS TRUE");
				this.neighbours.push(point.getId());
			}

			// if left i is out of bounds, I am at the left, so no left nbr
			if (!leftiIsOutOfBounds && point.i === leftI && point.j === this.j) {
				console.log("LEFT IS TRUE");
				this.neighbours.push(point.getId());
			}
			// if right i is out of bounds, I am at the right, so no right nbr
			if (!rightiIsOutOfBounds && point.i === rightI && point.j === this.j) {
				console.log("RIGHT IS TRUE");
				this.neighbours.push(point.getId());
			}
		}
	}
	get() {
		return this;
	}
}
