import type { T_Color } from "./@types";

export const config = {
	point_size: 60,
	row_count: 5,
	column_count: 5,
	offset: 70,
	canvas_width: 1000,
	canvas_height: 1000,
	canvas_transform_x: 100,
	canvas_transform_y: 100,
	text_size: 24,
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
