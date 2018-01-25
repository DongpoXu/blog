/*
 * worker.js
 */

importScripts("app03_Workerlib.js");

onmessage = function (task) {
    var workerResult = computeRow(task.data);
    postMessage(workerResult);
}
