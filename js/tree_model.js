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

	// todo: TreeModel and ColumnsModel share common pattern. Consider making them prototypical inherited?

	var model = {};

	function justify_position() {}

	function create_node() {}

	function right_pos_ofnode() {} //how to do this if encoded as object field reference?

	function is_at_right_post() {}

	function print() {}

	return model;
}
