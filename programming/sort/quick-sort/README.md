# 快速排序的核心思想

核心：**找到基准值的位置**

理解 `partition` 操作，是理解快速排序算法的关键。



1. 选择一个值作为基准值。
2. 将小于基准值的元素放在基准值的前面，将大于基准值的元素放在基准值的后面。这一步通常被叫做 `partition` 操作，即分割。
3. 对基准值的左右两侧，递归地进行第一步和第二步。



* 时间复杂度

  * 最好的情况：![img](https://latex.codecogs.com/svg.latex?O(nlog{n}))
  * 最差的情况：![img](https://latex.codecogs.com/svg.latex?O(n^2))


