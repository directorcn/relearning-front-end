function quickSort(arr, l, r) {
    // 递归的边界条件是区间中只有一个元素
    // left  : 记录从前向后扫描的位置
    // right  : 记录从后向前扫描的位置
    // pivot  : 基准值，选择待排序区间的第一个元素
    // while 循环中是 partition 过程
    // 每一轮，先从后向前扫，再从前向后扫
    if (l >= r) return;
    let left = l, right = r, pivot = arr[l]; 
    while (left < right) {
        while (left < right && arr[right] >= pivot)
            --right;
        if (left < right)
            arr[left++] = arr[right];
        while (left < right && arr[left] <= pivot)
            ++left;
        if (left < right)
            arr[right--] = arr[left];
    }

    // 将基准值 pivot 放入其正确位置数组的 left 位
    // 其实，此时 left === right，所以写成 arr[right] = pivot 也行
    // 再分别对左右区间，进行快速排序
    arr[left] = pivot;
    quickSort(arr, l, left - 1);
    quickSort(arr, left + 1, r);
    return arr;
}