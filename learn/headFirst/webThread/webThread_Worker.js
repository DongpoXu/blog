/*
 * worker.js
 */

importScripts("webThread_Workerlib.js");

onmessage = function (task) {
    var workerResult = computeRow(task.data);
    postMessage(workerResult);
}
