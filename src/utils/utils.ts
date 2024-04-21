export const Utils = {
	distance(x1: number, y1: number, x2: number, y2: number) {
		const xDiff = x2 - x1;
		const yDiff = y2 - y1;
		return Math.sqrt(xDiff ** 2 + yDiff ** 2);
	},
};
