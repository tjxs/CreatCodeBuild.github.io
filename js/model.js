/*
 * ColumnModel is the creator function of a columnModel object instance
 * Do not construct, because constructors are confusing in JS, at least to me
 *
 * @step: positive number, the distance between each column
 * @begin: the beginning position of the first column
 */


function smaller_than(cube1, cube2) {
  console.log(123);
  console.log(cube1.position.x, cube2.position.x);
  return cube1.geometry.parameters.height < cube2.geometry.parameters.height;
}

function larger_than(cube1, cube2) {
  return cube1.geometry.parameters.height > cube2.geometry.parameters.height;
}

function swap(array, a, b) {
  var x = array[a].position.x;
  array[a].position.setX(array[b].position.x);
  array[b].position.setX(x);
  var temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

function move_to(fromEle, array, toIndex) {
  var x = toIndex*2-100;
  console.log('before move', fromEle.position.x, x);
  fromEle.position.setX(x);
  array[toIndex] = fromEle;
  console.log('after move', fromEle.position.x);
}


function ColumnsModel(step, begin) {

  var model = {};
  model.columns = [];
  model.step = step;
  model.begin = begin;
  model.justify_position = justify_position;
  model.create_column = create_column;
  model.print = print;

  /*
   * Should be called every time after elements in columns are changed in position
  **/
  function justify_position() {
    for(var index in model.columns) {
      var rightPos = right_pos_of_column(index);
      if(columns[index].position.x !== rightPos) {
        columns[index].position.x = rightPos;
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
    cube.position.set(right_pos_of_column(model.columns.length), 0, 0);  //x, y, z
    columns.push(cube);
  }

  function right_pos_of_column(index) {
    return model.begin + index*model.step;
  }

  function print(columns) {
    for(var i = 0; i < columns.length; i++) {
      console.log(columns[i].geometry.parameters.height, columns[i].position.x);
    }
  }

  return model;
}

export { ColumnsModel };
