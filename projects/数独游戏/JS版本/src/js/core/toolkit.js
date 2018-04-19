//工具方法集

/*
 * 矩阵和数组相关工具
 */
const matrixToolkit = {
    makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    },

    makeMatrix(v = 0) {
        // return Array.from({length:9})
        //     .map(()=>makeRow(v));
        return Array.from({length: 9}, () => this.makeRow(v));
    },

    /*
     * Fisher-Yates洗牌算法
     */
    shuffle(array) {
        const endIndex = array.length - 2;
        for (let i = 0; i <= endIndex; i++) {
            const j = i + Math.floor(Math.random() * (array.length - i));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    /*
     * 检查指定位置是否可以填写数字
     * 由所在宫和所在行和列决定
     */
    checkFillable(matrix, n, rowIndex, colIndex) {
        //取到当前行数据
        const row = matrix[rowIndex];

        //随机生成一个列数据
        const column = this.makeRow().map((v, i) => matrix[i][colIndex]);
//        console.log(column);
        //获取宫信息
        const {boxIndex} = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
        const box = boxToolkit.getBoxCells(matrix, boxIndex);
        for (let i = 0; i < 9; i++) {
            if (row[i] === n) {
                console.log("行冲突！");
                return false;
            } else if (column[i] === n) {
                console.log("列冲突！");
                return false;
            }
            else if (box[i] === n) {
                console.log("宫冲突！");
                return false;
            }
        }
        return true;
    }
};

/*
 * 宫坐标系工具
 */
const boxToolkit = {
    getBoxCells(matrix, boxIndex) {
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3;
        const result = [];
        for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            const colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },

    convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },

    convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    }
};

//工具集
module.exports = class Toolkit {
    //矩阵和数组相关的工具
    static get matrix() {
        return matrixToolkit;
    }

    //宫坐标系相关的工具
    static get box() {
        return boxToolkit;
    }
};
