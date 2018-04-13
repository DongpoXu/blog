//生成数独解决方案

const Toolkit = require("./toolkit");

module.exports = class Generator {

    generate() {
        while (!this.initernalGenerate()) {
            console.warn("try again");
        }
    }

    initernalGenerate() {
        console.log("进入内部填写");
        this.matrix = Toolkit.matrix.makeMatrix();
        //生成一个随机的位置信息，用来对列进行选取
        this.orders = Toolkit.matrix.makeMatrix()
            .map(row => row.map((v, i) => i))
            .map(row => Toolkit.matrix.shuffle(row));

        for (let n = 1; n <= 9; n++) {
            if (!this.fillNumber(n)) {
                return false;
            }
        }
        console.log("内部填写完成");
        return true;
    }

    fillNumber(n) {
        //开始填写
        return this.fillRow(n, 0);
    }

    /*
     * 按行填写
     * 采用递归方式
     * 填写值为n
     * 初始从第0行开始
     */
    fillRow(n, rowIndex) {
        //从0-8，所以超出8则结束
        if (rowIndex > 8) {
//            console.log("index超过8，数字： " + n + " 填写完成");
            return true;
        }
//        console.log("第 " + rowIndex + " 行填写开始");
        //获取第一行的值
        const row = this.matrix[rowIndex];
        //随机选择列
        const orders = this.orders[rowIndex];
        console.log("start");
        for (let i = 0; i < 9; i++) {
            //从列的随机值中按顺序取值
            const colIndex = orders[i];
            console.log("将数值：" + n + "填入 第：" + (rowIndex + 1) + "行，第：" + (orders[i] + 1) + "处。");
            //如果这个位置有值，跳过
            if (row[colIndex]) {
//                console.log("该位置有值");
                continue;
            }

            //如果这个位置没有值
            //检查这个位置是否可以填入
            //当前列或者当前宫有相同值
            if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                console.log("宫行冲突");
                continue;
            }

            //填写值
            row[colIndex] = n;

            console.log("end");

            //当前行填写n成功，递归调用fillRow()在下一行中填写n
            //没有成功的话，继续寻找当前行下一个位置
            if (!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0;
                continue;
            }
            return true;
        }
        return false;
    }
};

// const generator = new Generator();
// generator.generate();
// console.log(generator.matrix);