import { config } from "../config";
import { Point } from "../point";
import { Line } from "../line";

export class Board {
	private selectedPointId: string | null = null;

	private pointMap = new Map<string, Point>();
	private lineMap = new Map<string, Line>();

	private connectionMap = new Map<string, string[]>();

	constructor(
		private point_size: number,
		private row_count: number,
		private column_count: number,
	) {
		this.createPoints();
		this.setNeighbours();
		// set neighbours of each point
	}

	private createPoints() {
		for (let i = 0; i < this.row_count; i++) {
			for (let j = 0; j < this.column_count; j++) {
				const x = i * (this.point_size + config.offset);
				const y = j * (this.point_size + config.offset);
				const point = new Point(j, i, y, x, this.point_size);
				this.pointMap.set(point.getId(), point);
			}
		}
	}

	private setNeighbours() {
		const points = this.getPoints();
		for (const point of points) {
			point.setNeighbours(points);
		}
	}

	getPointMap() {
		return this.pointMap;
	}

	getPoints() {
		// from point map create a list of points and return that
		const points: Point[] = [];

		for (const point of this.pointMap.values()) {
			points.push(point);
		}

		return points;
	}

	getLines() {
		const lines: Line[] = [];
		for (const line of this.lineMap.values()) {
			lines.push(line);
		}
		return lines;
	}

	onPointClick(pointId: string) {
		// if same point, return
		if (this.selectedPointId === pointId) {
			this.selectedPointId = null;
			this.setAllPointsDeselected();
			return;
		}
		// if line
		if (this.selectedPointId === null) {
			this.selectedPointId = pointId;
			return;
		}
		// create a new line
		const startPoint = this.pointMap.get(this.selectedPointId);
		const endPoint = this.pointMap.get(pointId);

		console.log("START NBR", startPoint?.getNeighbours());

		if (!startPoint || !endPoint) {
			this.selectedPointId = null;
			this.setAllPointsDeselected();
			return;
		}

		// if endPoint is not a neighbour of startPoint, return

		const isNeighbour = startPoint.getNeighbours().includes(endPoint.getId());
		if (!isNeighbour) {
			this.selectedPointId = null;
			this.setAllPointsDeselected();
			return;
		}

		// if connection already exists, return

		const startConnections = this.connectionMap.get(startPoint.getId()) || [];
		const endConnections = this.connectionMap.get(endPoint.getId()) || [];

		if (startConnections.includes(endPoint.getId())) {
			this.selectedPointId = null;
			this.setAllPointsDeselected();
			return;
		}

		const line = new Line(startPoint.getCoords(), endPoint.getCoords());
		this.lineMap.set(line.getId(), line);
		// set connections for start and end point

		startConnections.push(endPoint.getId());

		endConnections.push(startPoint.getId());

		this.selectedPointId = null;
		this.setAllPointsDeselected();
	}

	setAllPointsDeselected() {
		for (const point of this.getPoints()) {
			point.setUnchecked();
		}
	}
}
