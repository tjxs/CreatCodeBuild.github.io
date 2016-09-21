/*
 * Creator function. Do not construct. Constructor is a useless idea with potential confusing this binding
 **/

/*
 * @compare_function: (node1, node2) => bool, true if node1 > node2 else false
 * @return: an AVL tree
* */
function AVL(compare_function) {

	var compare = compare_function;

	function Node(obj) {
		if( !obj ) {
			throw TypeError('You can\'t create a falsy node!');
		}
		return {
			value: obj,
			height: null,
			left: null,
			right: null
		};
	}

	function left_rotate(parent) {
		var newParent = parent.right;
		parent.right = parent.right.left;
		newParent.left = parent;
		set_height(parent);
		set_height(newParent);
		return newParent
	}

	function right_rotate(parent) {
		var newParent = parent.left;
		parent.left = parent.left.right;
		newParent.right = parent;
		set_height(parent);
		set_height(newParent);
		return newParent
	}

	function set_height(node) {
			node.height = 1 + Math.max( height(node.left), height(node.right) );
	}

	function height(node) {
		return node? node.height : 0;
	}

	function add(value) {
		var node = Node(value);
		if( !node ) {
			throw TypeError('You can not add', node, 'to a tree');
		}
		tree.root = insert_on(tree.root, node);
	}

	/*
	 * @return: the new root of the balanced subtree
	 **/
	function insert_on(root, node) {
		if( !root ) {  // if the tree is empty
			set_height(node);
			return node;
		}
		// insert on child
		if( compare(node.value, root.value) ) {
			root.right = insert_on(root.right, node);
		} else {
			root.left = insert_on(root.left, node);
		}
		return balancing(root);
	}

	function balance_check(node) {
		return height(node.left) - height(node.right);
	}

	function balancing(node) {
		var balance = balance_check(node);
		if( balance > 1 ) {
			if( height(node.left.left) >= height(node.left.right) ) {
				node = right_rotate(node);
			}
			else {
				node.left = left_rotate(node.left);
				node = right_rotate(node);
			}
		}
		else if( balance < -1 ) {
			if( height(node.right.right) >= height(node.right.left) ) {
				node = left_rotate(node);
			}
			else {
				node.right = right_rotate(node.right);
				node = left_rotate(node)
			}
		}
		else {
			set_height(node);
		}
		return node;
	}

	function remove() {}

	function in_order(apply) {
		(function f(node, apply) {
			// console.log(node.value);
			if(node) {
				// console.log(node.left, 'OO', node.right);
				f(node.left, apply);
				apply(node);
				f(node.right, apply);
			}
		})(tree.root, apply);
	}

	function pre_order(node, apply) {}

	function post_order(node, apply) {}

	function level_order(apply) {
		if( tree.root ) {
			var q = [];
			q.push(tree.root);
			while( q.length > 0 ) {
				var node = q.shift();
				apply? apply(node): console.log(node.value);
				if( node.left ) {
					q.push(node.left)
				}
				if( node.right ) {
					q.push(node.right)
				}
			}
		}
		else {
			console.log('Tree is Empty!');
		}
	}



	// Create the tree
	var tree = {};
	tree.root = null;
	tree.add = add;
	tree.remove = remove();
	tree.pre_order = pre_order;
	tree.in_order = in_order;
	tree.post_order = post_order;
	tree.level_order = level_order;

	return tree;
}


// test
var tree = AVL(function(a, b) {
	// console.log(a, b);
	return a > b;
});

tree.add(-10);
tree.add(2);
tree.add(13);
tree.add(-13);
tree.add(-15);
tree.add(15);
tree.add(17);
tree.add(20);

tree.in_order(function(node) {
	console.log(node.value);
});

console.log('Level Order');
tree.level_order(function(node) {
	console.log(node.value);
});

