/* Generic Algorithms */
var Algorithm = {
  /*
   * Generic quick sort.
   * The caller scope needs to implement swap and compare depending on what type of array it tries to sort
   */
  quick_sort: function* quick_sort(array, start, end, swap, compare) {
    if(end > start) {
      var partitionGeneratorObj = this.partition(array, start, end, swap, compare);
      var wall = undefined;
      var done = false;
      while(!done) {
        var next = partitionGeneratorObj.next();
        // console.log('b finally yield ee', fy);
        if(next.value === undefined) {
          console.log(next.value);
          yield;
        } else {
          // console.log('b finally yield', fy);
          wall = next.value;
          done = true;
        }
      }
      // var wall = yield* .value;
      yield* this.quick_sort(array, start, wall-1, swap, compare);
      yield* this.quick_sort(array, wall+1, end, swap, compare);
    }
  },

  partition: function* partition(array, start, end, swap, compare) {
    var wall = start;
    for(var i = start; i < end; i++) {
      if(compare(array[i], array[end])) {
        console.log(wall, i);
        swap(array, wall, i);
        yield;
        wall++;
      }
    }
    console.log('wall', wall, end);
    swap(array, wall, end);
    yield wall;
  }
};


/* 3D */
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
function create_column(columns, pos, height) {
  var geometry = new THREE.BoxGeometry( 0.5, height, 0.5 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );
  cube.position.set(pos[0], pos[1], pos[2]);
  columns.push(cube);
}

function init_columns(numColumns) {
  columns = [];
  for(var i = 0; i < numColumns; i++) {
    create_column(columns, [i*2-Math.floor(numColumns/2)*2, 0, 0], numColumns - i);
  }
  return columns;
}

function add_all_to(scene, columns) {
  for(var c in columns) {
    // console.log(columns[c])
    scene.add(columns[c]);
  }
}

var i = 0;
// function sort(columns) {
//   if (i == 10) {
//     print(columns);
//     Algorithm.quick_sort(columns, 0, columns.length-1, swap, smaller_than);
//     print(columns);
//   }
//   i++;
// }

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
  // sort(columns);
  if (i % 20 === 19) {
  //   console.log(i);
    quickSortGenerator.next();
  }
  i++;
}
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var columns = init_columns(50);
add_all_to(scene, columns);

var quickSortGenerator = Algorithm.quick_sort(columns, 0, columns.length-1, swap, smaller_than);

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.z = 100;

render();
