let kits = {};

/**
 * @author 
 * @date 20190725
 * @description 用于获取当前时间的的方法
 * @return {正常日期格式的日期}  当前日期
 */


kits.formateDate = function () {
    let date = new Date();
    let y = date.getFullYear();
    let M = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    M = M < 10 ? '0' + M : M;
    d = d < 10 ? '0' + d : d;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
}

/**
 * @author 
 * @date 20190725
 * @description 用于获取随机整数的方法
 * @return {now + '' + r}   配合下面获取到很大几率不重复的唯一ID
 */
kits.randomInt = function (n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n);
}


/**
 * 封装的是一个可以生成唯一id的方法
 */
kits.primaryKey = function () {
    // 我们通过时间戳 + 大范围的随机数来生成id
    let now = Date.now(); //得到是从1970年到现在为止的总的毫秒数
    // 为了防止在1毫秒之内生成的id有多个，再次加上一个大范围的随机数
    let r = kits.randomInt(100000, 999999);
    // console.log(r);
    // 把两个得到的结果，拼接起来
    return now + '' + r;
}


/**
 * @author 
 * @date 20190725
 * @description 读取存储在localstorage里面的数组的方法
 * @param {string} key 存储数据使用的键
 * @return {Array} 返回一个数组,如果不存在,返回一个空数组
 * 应用于在数据中,旧数据和新数据的合并
 * 
 */

function loadData(key) {
    var str = localStorage.getItem(key);
    var arr = JSON.parse(str);
    // 判断有没有数据,没有就返回空数组
    if (!str) {
        arr = [];

    } else {
        arr = JSON.parse(str);
        // 有的话转对象
    }
    // 没有就返回空数组,有的话返回数据里面的数组
    return arr;
}

/**
 * @description 用于将数组存储到localStorage里面的方法
 * @param {string} key 存储使用的键
 * @param {Array} arr 要存储的数组数据
 * @return {undefined}
 * 
 */

function saveData(key, arr) {
    // 将数据转为JSON字符串
    var json = JSON.stringify(arr);
    // 保存到数据里面
    localStorage.setItem(key, json);
}




/**
 * @description 封装计算购物车里面的商品总量的代码
 * @param  
 * @param {Array} shopCart 保存在本地数据是的键的购物车每个商品的数据 
 * @return {int} 返回一个数字,商品总数量
 *
 */

function total() {
    //加载所有数据,配合上面的函数
    var arr = loadData('shopCart');

    // 计算总数
    // 先给个遍历保存数量
    var total = 0;
    arr.forEach(function () {
        total += e.number;
    });
    return total;

}




/**
 * @author 谁写的 联系方式
 * @date 20190725
 * @description 功能是什么 - 封装好的移动端的单击操作
 * @param { 类型 - element } element
 * @param {number} span 按下的时间间隔
 * @param {number} offset 允许的位置偏差
 * @param {function} callback 回调函数
 */






/**
 * @author 
 * @date 20190725
 * @description 功能是什么 - url参数提取
 * @param {object} 返回对象
 
 * 转换思路是：
        url参数长成： id=10086&name=goudan&pwd=123
        把url参数使用  &  割开，成为  [键=值,键=值...]
        再把数组里面的每个 键=值 再割开 ， [键,值]
 * */
// params 参数 temp  临时
kits.getUrlparams = function () {
    // location.search--获取url带问号的代码
    // substring(1)在1位字符串开始截取到最后,这里是不要?号
    // split('$') 以$隔开变成数组
    let arr = location.search.substring(1).split('$');
    let prams = {};//麻烦的数据用对象保存
    // 遍历数组把每个数组再用=号分开,组成数组,再赋值给对象
    arr.forEach(function (e) {
        let temp = e.split('=');
        let key = temp[0];
        let val = temp[1];
        prams[key] = val;
    });
    return prams;
}

// 外面使用:比如参数有id属性,提取id
// let params = kits.getUrlparams();
// id = params.id;







/**
 * @author 谁写的 联系方式
 * @date 20190725
 * @description 功能是什么 - if,else重复次数过多,不方便重复使用,要用到面向对象
 * @param { form} val  指某个输入框表单
 * @param {string} msg 提示信息
 * @param {number} len 判断输入字符串的长度
 * @param 其他的都是输入进去的形参
 */


// straregies 策略  isNonempty empty 空的

//           需要判断更多验证方法写在这里
let straregies = {
    //  val 是指哪个表单(输入框),msg提示错误信息
    // 这函数只返回uundefined就是flase,和错误的提示信息就是true
    // 判断是否为空用函数包裹着
    isNonempty: function (val, msg) {
        // .trim()  --去掉字符串左右两边的空格字符串
        // 判断的规则.判断数字比判断null或者其他的效率高

        if (val.trim().length === 0) {
            // 是空的话返回提示信息,并跳出去
            return msg;
        }
    },
    // val 是指哪个表单(输入框),len是输入的长度,msg提示错误信息
    // 判断长度
    minLength: function (val, len, msg) {

        if (val.trim().length < len) {
            return msg;
        }
    }
}

// 状态模式的思想： 使用状态代替if-else
// Validator  --验证器   validateFuncs--验证的函数数组
function Validator() {
    // this作用是这个Validator专有的意思,别人访问不了,
    //    个人看来构建函数是用来搞数据的
    this.validateFuncs = []; //装上面验证方法的数组
}


// 2.2 给构造函数的原型添加一个方法，让其可以添加一个新的函数进去
// 方便不需要js里面代码,可以在方法传参

// 把传上去的的参数放到装上面验证方法的数组
// dom指的是val指哪个表单(输入框),  
// arr 里面是 验证方法写在这里和不同的输入框提示的信息 数组

Validator.prototype.add = function (dom, arr) {
    // 遍历数组，往this.validateFuncs 添加新的验证的方法
    // 每个输入框对应有很多验证方法遍历装上面验证方法的数组去调用
    for (let i = 0; i < arr.length; i++) {
        let rule = arr[i];
        // arr相当于对象保存数据
        // 把验证的函数，放到函数数组里面
        let fn = function () {
            // 在里面把参数设置好,再return
            let params = rule.fnName.split(':');// [minLength,8]
            let fnName = params.shift(); // fnName里面可能会包含参数,从前面删掉
            params.unshift(dom.value); // [dom.vlaue,8]
            params.push(rule.errMsg); // [dom.value,8,rule.errMsg];



            // 此时调用 strategies[fnName] 这个函数，可能是两个参数，可能是三个参数，还可能是更多个参数
            // 函数名.apply(新this,[dom.value, ,errMsg])
            // isNonEmpty和minLength两个函数里面都没有用到this,所以this是谁就无所谓的，新this可以随意写
            return straregies[fnName], apply(dom, params);
        }
        this.validateFuncs.push(fn);
    }


    // 开始验证,把数组里面的函数遍历调用
    Validator.prototype.start = function () {
        // 从函数的数组里面，调用每个函数，返回错误信息
        for (let i = 0; i < this.validateFuncs.length; i++) {
            let errMsg = this.validateFuncs[i]();
            if (errMsg) {
                return errMsg;
            }
        }
    }


    // 外面引用格式

    // let vld = new Validator();
    //     vld.add(form.userName,
    //     [{
    //         validateFunName : 'isNonEmpty',
    //         errMsg : '用户名不为空'
    //     },
    //     {
    //         validateFunName : 'minLength:8',// 如果函数调用有多个参数，多个参数使用冒号隔开
    //         errMsg: '用户名的长度不能小于8'
    //     }]);


}
