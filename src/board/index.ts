import { config } from "../config";
import { Point } from "../point/point";

export class Board {
	private points: Point[];

	constructor(
		private point_size: number,
		private row_count: number,
		private column_count: number,
	) {
		this.points = this.createPoints();
	}

	private createPoints() {
		const points = [];
		for (let i = 0; i < this.row_count; i++) {
			for (let j = 0; j < this.column_count; j++) {
				const x = i * (this.point_size + config.offset);
				const y = j * (this.point_size + config.offset);
				points.push(new Point(j, i, y, x, this.point_size));
			}
		}
		return points;
	}

	getPoints() {
		return this.points;
	}
}
