/*我们现在要开一个餐厅啦，餐厅里面有服务员，有厨师，有顾客。学习面向对象，为餐厅和几个角色创建自己的类吧。

餐厅可以招聘或者解雇职员，职员越多，就越能够满足更多的顾客需求，从而赚取更多的钱

餐厅里的容量是有限的，当顾客坐满了，其他顾客需要排队

服务员的工作有两个职责，一个是负责点菜，另外一个是上菜

厨师的职责就一个，烹饪食物

顾客可以做两件事情，一个是点菜，一个是吃

系列任务的第一个部分，我们先只实现类的编写。并通过大量阅读掌握JavaScript的面向对象编程
*/

// 使用ES5的实现类的定义

/**
 * 餐厅类
 */
function Restaurant(obj) {
  this.money = obj.money;
  this.seats = obj.seats;
  this.staff = obj.staff;
}
Restaurant.prototype.hire = function (worker) {
  this.staff.push(worker)
}
Restaurant.prototype.fire = function (worker) {
  var index = this.staff.findIndex((val) => {
    val === worker;
  })
  this.staff.splice(index, 1);
}

/**
 * 职员类
 * @param {*} id
 * @param {*} name
 * @param {*} wages
 */
function Staff(id, name, wages) {
  this.id = id;
  this.name = name;
  this.wages = wages;
}
Staff.prototype.work = function () {

}

/**
 * 服务员类
 * @param {*} id
 * @param {*} name
 * @param {*} wages
 */
function Waiter(id, name, wages) {
  Staff.call(this, id, name, wages);
  this.order = [];
  Waiter.prototype = new Staff();
  Waiter.prototype.constructor = Waiter;
}
// 记录顾客点的菜
Waiter.prototype.work = function () {
  var arr = Array.from(arguments);
  // 如果参数是数组
  if (Array.isArray(arr[0])) {
    arr[0].forEach(ele => {
      this.order.push(ele);
    });
  } else {
    if (arr.length > 0) {
      arr.forEach((ele, index) => {
        // 如果ele在order里面，那么就将这个菜从点的菜单中剔除
        if (ele.indexOf(this.order) > -1) {
          this.order.splice(index, 1);
        }
      })
    }
  }
}

/**
 * 厨师类
 * @param {*} id
 * @param {*} name
 * @param {*} wages
 */
function Cook(id, name, wages) {
  Staff.call(this, id, name, wages);
  Cook.prototype = new Staff();
  Cook.prototype.constructor = Cook;
}
Cook.prototype.work = function () {

}
/**
 *顾客类
 */
function Customer() {}
Customer.prototype.order = function () {

}

Customer.prototype.eat = function () {

}
/**
 * 菜品类
 * @param {*} name
 * @param {*} cost
 * @param {*} price
 */
function Goods(name, cost, price) {
  this.name = name;
  this.cost = cost;
  this.price = price;
}

var ifeRestaurant = new Restaurant({
  cash: 1000000,
  seats: 20,
  staff: []
});

var newCook = new Cook("Tony", 10000);
ifeRestaurant.hire(newCook);
console.log(ifeRestaurant.staff);

ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staff);