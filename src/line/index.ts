import type { T_Coord } from "../@types";
import { v4 as uuidv4 } from "uuid";
import { p5Instance } from "../main";
export class Line {
	private id = uuidv4();
	constructor(
		private start: T_Coord,
		private end: T_Coord,
	) {}

	getId() {
		return this.id;
	}

	drawLine() {
		p5Instance.stroke(255);
		p5Instance.strokeWeight(2);
		p5Instance.strokeCap(p5Instance.ROUND);
		p5Instance.line(this.start.x, this.start.y, this.end.x, this.end.y);
	}
}
