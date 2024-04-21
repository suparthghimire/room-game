import p5 from "p5";
import { config } from "./config";
import { Board } from "./board";
import type { Point } from "./point";

const sketch = (p: p5) => {
	const board = new Board(
		config.point_size,
		config.row_count,
		config.column_count,
	);
	const points = board.getPoints();

	p.setup = () => {
		p.createCanvas(config.canvas_height, config.canvas_width);
	};
	p.draw = () => {
		p.background(40);
		p.translate(config.canvas_transform_x, config.canvas_transform_y);

		const lines = board.getLines();
		for (const line of lines) {
			line.drawLine();
		}
		for (const point of points) {
			point.drawPoint();
		}
	};
	p.mousePressed = (event?: PointerEvent) => {
		if (!event) return;
		let clickedPoint: Point | undefined = undefined;
		for (const point of points) {
			const isClicked = point.onClick(event.clientX, event.clientY);
			if (isClicked) clickedPoint = point;
		}
		if (!clickedPoint) return;
		board.onPointClick(clickedPoint.getId());
	};
	p.mouseMoved = (event?: PointerEvent) => {
		if (!event) return;

		for (const point of points) {
			point.onHover(event.clientX, event.clientY);
		}
	};
};

export const p5Instance = new p5(sketch);
