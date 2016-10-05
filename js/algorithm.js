/* Generic Algorithms */
var Algorithm = {
  /*
   * Generic quick sort.
   * The caller scope needs to implement swap and compare depending on what type of array it tries to sort
   * This Algorithm object implements generators only
   */
  quick_sort: function* quick_sort(array, start, end, swap, compare) {
    if(end > start) {
      var partitionGeneratorObj = this.partition(array, start, end, swap, compare);
      var wall = undefined;
      var done = false;
      while(!done) {
        var next = partitionGeneratorObj.next();
        if(next.value === undefined) {
          yield;
        } else {
          wall = next.value;
          done = true;
        }
      }

      yield* this.quick_sort(array, start, wall-1, swap, compare);
      yield* this.quick_sort(array, wall+1, end, swap, compare);
    }
  },

  partition: function* partition(array, start, end, swap, compare) {
    var wall = start;
    for(var i = start; i < end; i++) {
      if(compare(array[i], array[end])) {
        swap(array, wall, i);
        yield;
        wall++;
      }
    }
    swap(array, wall, end);
    yield wall;
  },

  merge_sort: function* merge_sort(array, move_to, compare) {
    if (array.length > 1) {
      var done;
      var m = Math.floor(array.length / 2);
      var left = array.slice(0, m);
      var right = array.slice(m);

      yield* this.merge_sort(left, move_to, compare);
      yield* this.merge_sort(right, move_to, compare);

      // merge
      var mergeGeneratorObj = this.merge(array, left, right, move_to, compare);
      done = false;
      while(!done) {
        var next = mergeGeneratorObj.next();
        if(next.value === undefined) {
          yield;
        } else {
          done = true;
        }
      }
    }
    yield 'done';
  },

  merge: function* merge(array, leftArray, rightArray, move_to, compare) {
    var i = 0;
    var l_i = 0;
    var r_i = 0;
    while(l_i < leftArray.length && r_i < rightArray.length) {
      if(compare(leftArray[l_i], rightArray[r_i])) {
        move_to(leftArray[l_i], array, i);
        l_i += 1;
      } else {
        move_to(rightArray[r_i], array, i);
        r_i += 1;
      }
      i++;
      yield;
    }
    // copy the remaining
    while(l_i < leftArray.length) {
      move_to(leftArray[l_i], array, i);
      l_i += 1;
      i += 1;
      yield;
    }
    while(r_i < rightArray.length) {
      move_to(rightArray[r_i], array, i);
      r_i += 1;
      i += 1;
      yield;
    }
    yield 'done';
  }
};



