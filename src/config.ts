import type { T_Color } from "./@types";

function calculateCanvasTransform(config: typeof baseConfig): {
	x: number;
	y: number;
} {
	const gridWidth =
		(config.column_count - 1) * (config.point_size + config.offset) +
		config.point_size;
	const gridHeight =
		(config.row_count - 1) * (config.point_size + config.offset) +
		config.point_size;

	const x = (config.canvas_width - gridWidth) / 2;
	const y = (config.canvas_height - gridHeight) / 2;

	return { x, y };
}

const baseConfig = {
	point_size: 30,
	row_count: 25,
	column_count: 45,
	offset: 30,
	canvas_width: window?.innerWidth ?? 1000,
	canvas_height: window?.innerHeight ?? 1000,
	text_size: 10,
	hover_color: {
		r: 90,
		g: 90,
		b: 90,
	} satisfies T_Color,
	selected_color: {
		r: 255,
		g: 255,
		b: 255,
	} satisfies T_Color,
	deselected_color: {
		r: 40,
		g: 40,
		b: 40,
		// a: 40,
	} satisfies T_Color,
};
export const config = {
	...baseConfig,
	canvas_transform_x: calculateCanvasTransform(baseConfig).x,
	canvas_transform_y: calculateCanvasTransform(baseConfig).y,
};
