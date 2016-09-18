/*
 * ColumnModel is the creator function of a columnModel object instance
 * Do not construct, because constructors are confusing in JS, at least to me
 * Author: CreatCodeBuild@github.com
 */


function smaller_than(cube1, cube2) {
  // console.log(123);
  // console.log(cube1.position.x, cube2.position.x);
  return cube1.geometry.parameters.height < cube2.geometry.parameters.height;
}

function larger_than(cube1, cube2) {
  return cube1.geometry.parameters.height > cube2.geometry.parameters.height;
}

function swap(array, a, b) {
  // var x = array[a].position.x;
  // array[a].position.setX(array[b].position.x);
  // array[b].position.setX(x);
  var temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

function move_to(fromEle, array, toIndex) {
  // var x = toIndex*2-100;
  // console.log('before move', fromEle.position.x, x);
  // fromEle.position.setX(x);
  array[toIndex] = fromEle;
  // console.log('after move', fromEle.position.x);
}


/*
 * @begin: 2-d array [x, z]; the begining point of x and z
 * @orientation: array as a 2-d vector [x, z]; how many distance between each column and to which direction
 * return a columns model
 */
function ColumnsModel(begin, orientation) {

  // if(orientation !== [0,1] || orientation !== [1,0] || orientation !== [0,-1] || orientation !== [-1,0]) {
  //   throw Error('orientation value error');
  // }

  var model = {};
  model.columns = [];
  model.begin = begin;
  model.justify_position = justify_position;
  model.create_column = create_column;
  model.print = print;

  /*
   * Should be called every time after elements in columns are changed in position
  **/
  // let count = 1;
  function justify_position() {
    // console.log('justify_position', count++);
    for(var index in model.columns) {
      if(!is_at_right_pos(index)) {
        // console.log('not right', model.columns[index].position.x, rightPos);
	      var rightPos = right_pos_of_column(index);
        model.columns[index].position.x = rightPos[0];
	      model.columns[index].position.z = rightPos[1];
      }
    }
  }

  /*
   * Create a new column and add it to model.columns in order
   */
  function create_column(height) {
    var geometry = new THREE.BoxGeometry( 0.5, height, 0.5 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );

	  // set the correct position of column/cube
	  var pos = right_pos_of_column(model.columns.length);
    cube.position.set(pos[0], 0, pos[1]);  //x, y, z
    model.columns.push(cube);
  }

  function right_pos_of_column(index) {
    return [model.begin[0] + index*orientation[0], model.begin[1] + index*orientation[1]];
  }

  /*
   * Only check x and z position for now. Y is always zero
   * @return: bool
   */
  function is_at_right_pos(index) {
  	var pos = right_pos_of_column(index);
  	return model.columns[index].position.x === pos[0] && model.columns[index].position.z === pos[1];
  }

  function print() {
    for(var i = 0; i < model.columns.length; i++) {
      console.log(model.columns[i].geometry.parameters.height, model.columns[i].position.x);
    }
  }

  return model;
}

// export default { ColumnsModel };
