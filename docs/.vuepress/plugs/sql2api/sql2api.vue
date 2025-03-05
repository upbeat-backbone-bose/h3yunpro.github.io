<template>
    <div class="container">
        <!-- SQL 输入框 -->
        <textarea placeholder="请在此处输入要转换的SELECT语句..." v-model="sql"></textarea>

        <!-- 生成按钮 -->
        <button @click="generate">生成LoadBizObjects接口请求JSON</button>

        <!-- 输出区域 -->
        <div class="output-container">
            <div class="output-header">
                <div class="output-label">输出区域</div>
                <button class="copy-btn" :class="{ 'copy-ok': copyStatus }" @click="copyResult">
                    {{ copyStatus ? "√复制成功" : "点我复制结果" }}
                </button>
            </div>
            <pre :class="{ error: outputError }">{{ outputContent }}</pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AST, Parser, Select } from 'node-sql-parser';
import copy from 'copy-to-clipboard';

import { exampleSQL } from './exampleSQL.ts';
import generateApiRequest from './parser.ts';

const sql = ref(exampleSQL);
const outputContent = ref('');
const outputError = ref(false);
const copyStatus = ref(false);

function generate() {
    try {
        const sqlStr = sql.value;
        if (!sqlStr) {
            throw new Error('请先输入要转换的SELECT语句');
        }
        if (sqlStr.toUpperCase().indexOf('BETWEEN') >= 0) {
            throw new Error('LoadBizObjects不支持BETWEEN查询');
        }

        const parser = new Parser();
        const astArray = parser.astify(sqlStr, {
            database: 'mysql'
        }); // 解析SQL为AST
        if (!astArray) {
            throw new Error('解析SQL失败');
        }
        if (Array.isArray(astArray)) {
            throw new Error('只支持一条SELECT语句');
        }
        const ast = astArray as AST;
        if (ast.type !== 'select') {
            throw new Error('只支持SELECT语句');
        }
        const select = ast as Select;

        const result = generateApiRequest(select); // 生成API请求JSON
        outputContent.value = JSON.stringify(result, null, 2);
        outputError.value = false;
    } catch (error) {
        outputContent.value = error.message;
        outputError.value = true;
    }
}

//复制结果
function copyResult() {
    if (!outputContent.value || copyStatus.value) {
        return;
    }

    const r = copy(outputContent.value);
    if (r) {
        copyStatus.value = true;
        setTimeout(() => {
            copyStatus.value = false;
        }, 2000);
    }
}
</script>

<style scoped>
.container {
    border-radius: 12px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 25px;
    margin: 5px;
}

h1 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
}

textarea {
    width: 100%;
    height: 150px;
    /* font-family: 'Courier New', monospace; */
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 8px;
    resize: vertical;
    outline: none;
    transition: border-color 0.3s ease;
    min-height: 150px;
}

textarea:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

button {
    width: 100%;
    padding: 8px;
    margin-top: 16px;
    background-color: #007bff;
    color: white;
    font-size: 14px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}

button:active {
    background-color: #004080;
}

.output-container {
    margin-top: 24px;
}

.output-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.output-label {
    font-size: 14px;
    font-weight: bold;
    color: #555;
}

.copy-btn {
    width: 120px;
    padding: 6px 12px;
    background-color: #f8f9fa;
    color: black;
    font-size: 12px;
    font-weight: bold;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.copy-btn:hover {
    background-color: #746c6c;
    color: white;
}

.copy-btn.copy-ok {
    background-color: #1e7e34;
    color: white;
}

pre {
    background-color: #f8f9fa;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    color: #333;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-height: 300px;
    overflow-y: auto;
}

pre.error {
    color: #dc3545;
}
</style>