var Algorithm = {
  quick_sort: function quick_sort(array, start, end, swap, compare) {
    if(end > start) {
      var wall = this.partition(array, start, end, swap, compare);
      this.quick_sort(array, start, wall-1, swap, compare);
      this.quick_sort(array, wall+1, end, swap, compare);
    }
  },

  partition: function partition(array, start, end, swap, compare) {
    var wall = start;
    for(var i = start; i < end; i++) {
      if(compare(array[i], array[end])) {
        swap(array, wall, i);
        wall++;
      }
    }
    swap(array, wall, end);
    return wall;
  }
};


function smaller_than(cube1, cube2) {
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



// add a column to scene
function create_column(scene, columns, pos, height) {
  var geometry = new THREE.BoxGeometry( 0.5, height, 0.5 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );
  cube.position.set(pos[0], pos[1], pos[2]);
  columns.push(cube);
  scene.add( cube );
}

var i = 0;
function sort(columns) {
  if (i == 50) {
    print(columns);
    Algorithm.quick_sort(columns, 0, columns.length-1, swap, smaller_than);
    print(columns);
  }
  i++;
}

function print(columns) {
  for(var i = 0; i < columns.length; i++) {
    console.log(columns[i].geometry.parameters.height, columns[i].position.x);
    // console.log();
  }
}




/* Start */
function render() {
  requestAnimationFrame( render );
  renderer.render( scene, camera );
  sort(columns);
}
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var columns = [];

create_column(scene, columns, [-4,0,0], 2);
create_column(scene, columns, [-2,0,0], 3);
create_column(scene, columns, [0,0,0], 1);
create_column(scene, columns, [2,0,0], 4);
create_column(scene, columns, [4,0,0], 5);

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.z = 10;

render();
