/*
 * The view-model of a binary tree? Controller? Adapter?
 * I don't really know the right term
 **/

/*
 * @leafStep: a (x, z) vector, the distance between 2 leaves and the direction
 * @rootPos: the (x, y, z) position of root
 * @levelHeight: the height of each level, non-zero number
 * TreeModel is the creator function of a TreeModel object instance
 * Do not construct, because constructors are confusing in JS, at least to me
 **/
function TreeModel(leafStep, rootPos, levelHeight) {

	// Do I encode tree in object field reference? Or in array?

	//todo: implement it
	var model;

	function adjust_position() {}

	function add_node() {}

	function right_pos_of_node() {} //how to do this if encoded as object field reference?

	function is_at_right_pos() {}

	/*
	 * 比较两个立方体Cube的大小。这里的大小不是体积，而是颜色的RPG值的总和
	 * @cub1, cube2: Mesh
	 * @return: boolean cube1 > cube2
	 */
	function compare_color(cube1, cube2) {
		var hex1 = cube1.material.color.getHex();	// 注意，这里的Hex值是RGB的乘积，不是和
		var hex2 = cube2.material.color.getHex();

		var sum1 = hex1;	// Implement it
		var sum2 = hex2;
		
		return sum1 > sum2;
	}

	function print() {}

	model = {};
	model.tree = AVL(compare_color);
	model.add_node = add_node;
	model.adjust_position = adjust_position;
	return model;
}
