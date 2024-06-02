// Import lodash
import _ from "lodash";

// Function to get memory usage
function getMemoryUsage() {
    const memoryUsage = process.memoryUsage();
    return memoryUsage.heapUsed / 1024 / 1024; // Convert to MB
}

// Function to get CPU usage
function getCPUusage() {
    const cpuUsage = process.cpuUsage();
    return cpuUsage;
}

// Time benchmark
console.time("time");
for (let i = 0; i < 100; i++) {
    console.log("Hello via Bun!");
}
console.timeEnd("time");

// Memory benchmark
const memoryBefore = getMemoryUsage();
const cpuBefore = getCPUusage();
console.time("memory");

// Create a large array of objects to consume memory
const largeArray = _.times(100000, () => ({
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10,
    k: 11, l: 12, m: 13, n: 14, o: 15, p: 16, q: 17, r: 18, s: 19,
    t: 20, u: 21, v: 22, w: 23, x: 24, y: 25, z: 26,
}));
console.timeEnd("memory");

const memoryAfter = getMemoryUsage();
const cpuAfter = getCPUusage();

// Calculate CPU usage difference
const cpuUserUsed = cpuAfter.user - cpuBefore.user; // in microseconds
const cpuSystemUsed = cpuAfter.system - cpuBefore.system; // in microseconds

console.log(`Memory before: ${memoryBefore.toFixed(2)} MB`);
console.log(`Memory after: ${memoryAfter.toFixed(2)} MB`);
console.log(`Memory used: ${(memoryAfter - memoryBefore).toFixed(2)} MB`);

console.log(`CPU user time before: ${cpuBefore.user} µs`);
console.log(`CPU user time after: ${cpuAfter.user} µs`);
console.log(`CPU system time before: ${cpuBefore.system} µs`);
console.log(`CPU system time after: ${cpuAfter.system} µs`);
console.log(`CPU user time used: ${cpuUserUsed} µs`);
console.log(`CPU system time used: ${cpuSystemUsed} µs`);
console.log(`Total CPU time used: ${cpuUserUsed + cpuSystemUsed} µs`);

console.log("Hello via Bun!");
