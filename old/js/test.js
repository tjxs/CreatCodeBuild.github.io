
var g = b();

function* a() {
  var bG = b();
  var done = false;
  while(!done) {
    var fy = bG.next();
    console.log('b finally yield ee', fy);
    if(fy.value != 30) {
      yield;
    } else {
      console.log('b finally yield', fy);
      done = true;
    }
  }
}

function* b() {
  // yield* d();
  yield;
  yield 30;
}

function* d() {
  yield 5;
}

function* c(i) {
  if(i>0) {
    console.log('b');
    yield i;
    console.log('recur');
    yield* c(--i);
  } else {
    yield i
  }
}

(function main() {
  let e = a(10);
  for(var i = 0; i < 5; i++) {
    console.log(i);
    e.next();
    console.log();
  }

})();