import p5 from "p5";
import { config } from "./config";
import { Board } from "./board";

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

		for (const point of points) {
			point.drawPoint(p);
		}
	};
	p.mousePressed = (event?: PointerEvent) => {
		if (!event) return;

		for (const point of points) {
			point.onClick(p, event.clientX, event.clientY);
		}
	};
	p.mouseMoved = (event?: PointerEvent) => {
		if (!event) return;

		for (const point of points) {
			point.onHover(p, event.clientX, event.clientY);
		}
	};
};

new p5(sketch);
